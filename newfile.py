import zipfile, os

# create a sample folder for your project
os.makedirs("grocery_app", exist_ok=True)

# make a sample file
with open("grocery_app/readme.txt", "w") as f:
    f.write("Grocery + Food + Pharmacy App Files")

# create a zip file
zip_name = "grocery_pharmacy_app.zip"
with zipfile.ZipFile(zip_name, "w", zipfile.ZIP_DEFLATED) as zipf:
    for folder, _, files in os.walk("grocery_app"):
        for file in files:
            file_path = os.path.join(folder, file)
            zipf.write(file_path, os.path.relpath(file_path, "grocery_app"))

print("✅ ZIP file created successfully!")
print(f"📦 Saved as: {os.path.abspath(zip_name)}")