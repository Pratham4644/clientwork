import os
import re

def replace_in_files(directory, old_text, new_text, extensions):
    for root, dirs, files in os.walk(directory):
        for file in files:
            if any(file.endswith(ext) for ext in extensions):
                filepath = os.path.join(root, file)
                try:
                    with open(filepath, 'r', encoding='utf-8') as f:
                        content = f.read()
                    # Case-insensitive replacement
                    new_content = re.sub(re.escape(old_text), new_text, content, flags=re.IGNORECASE)
                    if new_content != content:
                        with open(filepath, 'w', encoding='utf-8') as f:
                            f.write(new_content)
                        print(f"Replaced in {filepath}")
                except Exception as e:
                    print(f"Error processing {filepath}: {e}")

if __name__ == "__main__":
    directory = r"d:\clientwork\simply-construction-prototype"
    old_text = "Simply Construction"
    new_text = "Prototype"
    extensions = ['.html', '.css', '.js', '.txt', '.md']
    replace_in_files(directory, old_text, new_text, extensions)
    print("Replacement completed.")