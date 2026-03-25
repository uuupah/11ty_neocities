#! /usr/bin/python3

import re
import sys

import requests


def main():
    if len(sys.argv) < 2:
        print("invalid")
        return

    youtube_link = sys.argv[1]
    pattern = r".*(?:youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=)([^#\&\?]*).*"

    matches = re.findall(pattern, youtube_link)

    if matches:
        response = requests.get(
            f"https://i.ytimg.com/vi/{matches[0]}/maxresdefault.jpg"
        )
        with open(f"src/_assets/img/blog_2026/{matches[0]}.jpg", mode="wb") as file:
            file.write(response.content)

if __name__ == "__main__":
    main()
