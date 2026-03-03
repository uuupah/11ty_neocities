#! /usr/bin/python3

import sys
import os
import re
import platform
import subprocess
from PIL import Image as im
from argparse import ArgumentParser as argparser

# width in pixels
MAX_WIDTH = 720
# filetype
OUTPUT_FILETYPE = "webp"
IMG_FM = (".tif", ".tiff", ".jpg", ".jpeg", ".gif", ".png", ".eps",
          ".raw", ".cr2", ".nef", ".orf", ".sr2", ".bmp", ".ppm", ".heif", ".webp", "avif")
NO_ALPHA_FILETYPES = ("jpg", "jpeg")


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
    # note that this isnt a bulletproof way to check a file is _actually_ an
    # image, but pil can figure out the filetype for us if its been misattributed
    # in the file metadata - this just stops us from wasting time trying to
    # process markdown files or js code, but also means we're not relying on some
    # stupid fucking package solution for an extremely simple problem
    return os.path.splitext(filepath)[1].lower() in IMG_FM


def compress_png(filepath):
    if platform.system() == "Windows":
        subprocess.run(["./optipng.exe", "-o7", filepath])
    else:
        subprocess.run(["optipng", "-o7", filepath])
        # print("booyah")
        # do linux compression


def process_image(filepath):
    print("processing " + filepath)
    with im.open(filepath) as current_image:
        if (current_image.width > MAX_WIDTH):
            print("> width is " + str(current_image.width) +
                  ", resizing to " + str(MAX_WIDTH) + "px")
            width_percent = MAX_WIDTH / float(current_image.width)
            new_height = int(
                (float(current_image.height) * float(width_percent)))
            current_image = current_image.resize(
                (MAX_WIDTH, new_height), im.Resampling.LANCZOS)
        if current_image.mode in ("RGBA", "P") and OUTPUT_FILETYPE in NO_ALPHA_FILETYPES:
            current_image = current_image.convert("RGB")
        filename_slug = slugify(os.path.splitext(
            os.path.basename(filepath))[0])
        current_image.save(os.path.join(os.path.dirname(
            filepath), (filename_slug + "." + OUTPUT_FILETYPE)), quality=90)
    if (OUTPUT_FILETYPE == "png"):
        compress_png(os.path.join(os.path.dirname(filepath),
                     (filename_slug + "." + OUTPUT_FILETYPE)))
    return


def slugify(s: str) -> str:
    s_after_basic_replacement = re.sub("[^a-zA-Z0-9]", "-", s)
    s_with_no_continues_dash = re.sub("[-]+", "-", s_after_basic_replacement)
    s_with_no_ending_dash = re.sub("-$", "", s_with_no_continues_dash)
    return s_with_no_ending_dash


if __name__ == "__main__":
    main()
