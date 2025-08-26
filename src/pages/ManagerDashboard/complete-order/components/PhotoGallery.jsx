import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { X, ChevronLeft, ChevronRight, Maximize2 } from 'lucide-react';

const PhotoGallery = ({ photos, title, className = "" }) => {
    const [selectedPhoto, setSelectedPhoto] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = (index) => {
        setSelectedPhoto(index);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedPhoto(null);
    };

    const nextPhoto = () => {
        setSelectedPhoto((prev) => (prev + 1) % photos.length);
    };

    const prevPhoto = () => {
        setSelectedPhoto((prev) => (prev - 1 + photos.length) % photos.length);
    };

    return (
        <div className={className}>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {photos.map((photo, index) => (
                    <div key={index} className="relative group">
                        <img
                            src={photo}
                            alt={`${title} ${index + 1}`}
                            className="w-full h-48 object-cover rounded-lg border cursor-pointer transition-transform duration-200 group-hover:scale-105"
                            onClick={() => openModal(index)}
                        />
                        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-200 rounded-lg flex items-center justify-center">
                            <Button
                                variant="secondary"
                                size="sm"
                                className="opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                                onClick={() => openModal(index)}
                            >
                                <Maximize2 className="h-4 w-4 mr-1" />
                                View Full
                            </Button>
                        </div>
                    </div>
                ))}
            </div>

            {/* Modal for full-size photo view */}
            <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
                <DialogContent className="max-w-4xl max-h-[90vh] p-0">
                    <DialogHeader className="p-4 border-b">
                        <DialogTitle className="flex items-center justify-between">
                            <span>{title} - Photo {selectedPhoto !== null ? selectedPhoto + 1 : ''} of {photos.length}</span>
                            <Button
                                variant="ghost"
                                size="sm"
                                onClick={closeModal}
                                className="h-8 w-8 p-0"
                            >
                                <X className="h-4 w-4" />
                            </Button>
                        </DialogTitle>
                    </DialogHeader>

                    <div className="relative">
                        {selectedPhoto !== null && (
                            <img
                                src={photos[selectedPhoto]}
                                alt={`${title} ${selectedPhoto + 1}`}
                                className="w-full h-auto max-h-[70vh] object-contain"
                            />
                        )}

                        {/* Navigation buttons */}
                        {photos.length > 1 && (
                            <>
                                <Button
                                    variant="secondary"
                                    size="sm"
                                    className="absolute left-4 top-1/2 transform -translate-y-1/2 h-10 w-10 p-0 rounded-full"
                                    onClick={prevPhoto}
                                >
                                    <ChevronLeft className="h-5 w-5" />
                                </Button>
                                <Button
                                    variant="secondary"
                                    size="sm"
                                    className="absolute right-4 top-1/2 transform -translate-y-1/2 h-10 w-10 p-0 rounded-full"
                                    onClick={nextPhoto}
                                >
                                    <ChevronRight className="h-5 w-5" />
                                </Button>
                            </>
                        )}
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default PhotoGallery;
