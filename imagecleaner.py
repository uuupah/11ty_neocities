import sys, os, re
from  PIL import Image as im

# width in pixels
MAX_WIDTH = 720
# filetype
OUTPUT_FILETYPE = "jpg"
IMG_FM = (".tif", ".tiff", ".jpg", ".jpeg", ".gif", ".png", ".eps", 
  ".raw", ".cr2", ".nef", ".orf", ".sr2", ".bmp", ".ppm", ".heif", ".webp")

def main():
  if len(sys.argv) < 2:
    print("invalid")
    return

  file_or_directory = sys.argv[1]

  if os.path.isfile(file_or_directory):
    handle_file(file_or_directory)
  elif os.path.isdir(file_or_directory):
    handle_directory(file_or_directory)
  else:
    print("invalid")

def handle_file(filepath):
  if verify_file_is_image(filepath):
    process_image(filepath)
  else: 
    print("file " + filepath + " is not an image, ignoring")
  return

def handle_directory(dirpath):
  for entry in os.listdir(dirpath):
    if os.path.isdir(dirpath + entry):
      print(dirpath + entry + " is subdirectory, ignoring")
    else:
      handle_file(dirpath + entry)
  return

def verify_file_is_image(filepath):
  return os.path.splitext(filepath)[1] in IMG_FM

def process_image(filepath):
  print("processing " + filepath)
  with im.open(filepath) as current_image:
    if (current_image.width > MAX_WIDTH):
      print("> width is " + str(current_image.width) + ", resizing to 720px")
      width_percent = MAX_WIDTH / float(current_image.width)
      new_height = int((float(current_image.height) * float(width_percent)))
      current_image = current_image.resize((MAX_WIDTH, new_height), im.Resampling.LANCZOS)
    if current_image.mode in ("RGBA", "P"): 
      current_image = current_image.convert("RGB")
    filename_slug = slugify(os.path.splitext(os.path.basename(filepath))[0])
    current_image.save(os.path.join(os.path.dirname(filepath), (filename_slug + "." + OUTPUT_FILETYPE)))
  return

def slugify(s: str) -> str:
  s_after_basic_replacement = re.sub("[^a-zA-Z0-9]", "-", s)
  s_with_no_continues_dash = re.sub("[-]+", "-", s_after_basic_replacement)
  s_with_no_ending_dash = re.sub("-$", "", s_with_no_continues_dash)
  return s_with_no_ending_dash

if __name__ == "__main__":
  main()