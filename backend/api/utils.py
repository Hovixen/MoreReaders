import secrets
import os

def upload(file, folder):
    """function saves images in path"""
    if file:
        hex_name = secrets.token_hex(8)
        _, file_ext = os.path.splitext(file.filename)
        file_name = hex_name + file_ext
        file_path = os.path.join(folder, file_name)
        file.save(file_path)
        return file_path
    return none
    