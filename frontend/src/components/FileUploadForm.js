import { useState } from "react";

export default function FileUploadForm({ onFileUpload }) {
    const [file, setFile] = useState(null)
    function handleSubmit(e) {
        e.preventDefault();

        if (file) {
            onFileUpload(file);
        }
    }

    return (
      <>
        <form
          id="file-upload-form"
          class="uploader"
          onSubmit={handleSubmit}
          enctype="multipart/form-data"
        >
          <input
            id="file-upload"
            type="file"
            name="fileUpload"
            accept=".csv"
            onChange={(e) => setFile(e.target.files[0])}
          />

          <label for="file-upload" id="file-drag">
            <img id="file-image" src="#" alt="Preview" class="hidden" />
            <div id="start">
              <i class="fa fa-download" aria-hidden="true"></i>
              <div>Select a file or drag here</div>
              <div id="notimage" class="hidden">
                Please select an image
              </div>
            {file ? (
                <span id="file-upload-btn" class="btn btn-primary">
                  {file.name}
              </span>
              ):(
                  <span id="file-upload-btn" class="btn btn-primary">
                  Select a file
                  </span>
              )
              }
            </div>
            <div id="response" class="hidden">
              <div id="messages"></div>
              <progress class="progress" id="file-progress" value="0">
                <span>0</span>%
              </progress>
            </div>
          </label>
          {file ? (
            <button type="submit" className="btn">
              Process CSV
            </button>
          ) : (
            <button type="submit disabled" className="btn" disabled>
              Process CSV
            </button>
          )}
        </form>
      </>
    );
}
