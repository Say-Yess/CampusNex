// src/pages/CreateEvent/components/ImageUpload.js
import React from 'react';

const ImageUpload = ({
    imageFile = null,
    imagePreview = '',
    imageUrl = '',
    uploadingImage = false,
    onImageChange = () => { },
    onImageUrlChange = () => { },
    onRemoveImage = () => { },
    error = null
}) => {
    return (
        <div>
            <label className="block text-gray-700 font-semibold mb-2">Event Image</label>
            <div className="space-y-4">
                {uploadingImage ? (
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-6">
                        <div className="text-center">
                            <div className="animate-spin w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full mx-auto mb-4"></div>
                            <p className="text-gray-600">Uploading image...</p>
                        </div>
                    </div>
                ) : !imagePreview ? (
                    <ImageUploadArea onImageChange={onImageChange} />
                ) : (
                    <ImagePreview
                        imagePreview={imagePreview}
                        imageFile={imageFile}
                        onRemove={onRemoveImage}
                    />
                )}

                {/* Alternative: Add URL option */}
                <div className="text-center text-gray-500">
                    <span className="text-sm">or</span>
                </div>
                <div>
                    <label className="block text-sm text-gray-600 mb-1">Add image from URL</label>
                    <input
                        name="imageUrl"
                        type="url"
                        value={imageUrl || ''}
                        onChange={onImageUrlChange}
                        className="w-full border rounded-lg px-4 py-2 text-sm"
                        placeholder="https://example.com/image.jpg"
                        disabled={!!imageFile || uploadingImage}
                    />
                </div>

                {/* Error Message */}
                {error && (
                    <div className="text-red-600 text-sm mt-2">
                        {error}
                    </div>
                )}
            </div>
        </div>
    );
};

const ImageUploadArea = ({ onImageChange }) => (
    <div className="border-2 border-dashed border-gray-300 rounded-lg p-6">
        <div className="text-center">
            <svg className="w-12 h-12 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
            </svg>
            <h3 className="text-lg font-medium text-gray-900 mb-2">Upload Event Image</h3>
            <p className="text-sm text-gray-500 mb-4">
                Choose an attractive image that represents your event
            </p>
            <label className="bg-blue-500 text-white px-6 py-2 rounded-lg cursor-pointer hover:bg-blue-600 transition-colors duration-200 inline-flex items-center gap-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                Browse Files
                <input
                    type="file"
                    accept="image/*"
                    onChange={onImageChange}
                    className="hidden"
                />
            </label>
            <p className="text-xs text-gray-400 mt-2">
                Supported formats: JPG, PNG, GIF (Max 5MB)
            </p>
        </div>
    </div>
);

const ImagePreview = ({ imagePreview, imageFile, onRemove }) => (
    <div className="relative">
        <img
            src={imagePreview}
            alt="Event preview"
            className="w-full h-48 object-cover rounded-lg border"
        />
        <button
            type="button"
            onClick={onRemove}
            className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full hover:bg-red-600 transition-colors duration-200"
        >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
        </button>
        <div className="absolute bottom-2 left-2 bg-black bg-opacity-50 text-white px-2 py-1 rounded text-sm">
            {imageFile?.name}
        </div>
    </div>
);

export default ImageUpload;