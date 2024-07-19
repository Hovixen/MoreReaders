import secrets
import os

def upload(file, folder):
    """function saves images in path"""
    # rel_path = ""
    if file:
        hex_name = secrets.token_hex(8)
        _, file_ext = os.path.splitext(file.filename)
        file_name = hex_name + file_ext
        rel_path = os.path.join('assets', 'images', file_name) if 'images' in folder else os.path.join('assets', 'books', file_name)
        file_path = os.path.join(folder, file_name)
        file.save(file_path)
        return rel_path
    return none
    