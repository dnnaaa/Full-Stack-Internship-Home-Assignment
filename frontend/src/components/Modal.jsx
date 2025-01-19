export default function Modal({ title, onClose, onSave, formData, handleChange }) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center">
        <div className="bg-white p-6 rounded shadow-lg w-96">
          <h2 className="text-xl font-bold mb-4">{title}</h2>
          <div className="mb-4">
            <label className="block text-sm font-medium">Title</label>
            <input
              name="title"
              value={formData.title || ""}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium">Description</label>
            <textarea
              name="description"
              value={formData.description || ""}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium">Location</label>
            <input
              name="location"
              value={formData.location || ""}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium">Salary</label>
            <input
              name="salary"
              type="number"
              value={formData.salary || ""}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded"
            />
          </div>
          <div className="flex justify-end">
            <button
              onClick={onClose}
              className="bg-gray-500 text-white px-4 py-2 rounded mr-2"
            >
              Cancel
            </button>
            <button
              onClick={onSave}
              className="bg-blue-500 text-white px-4 py-2 rounded"
            >
              Save
            </button>
          </div>
        </div>
      </div>
    );
  }
  