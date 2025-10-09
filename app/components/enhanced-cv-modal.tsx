"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  Printer,
  FileText,
  ZoomIn,
  ZoomOut,
  Maximize2,
  Minimize2,
  ChevronLeft,
  ChevronRight,
  Loader2,
  Calendar,
  User,
  Award,
  Mail,
  Linkedin,
  Link2,
  CheckCircle,
  Smartphone,
  Monitor,
  Tablet,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface CVPreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface DownloadFormat {
  id: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  filename: string;
  path: string;
  primary?: boolean;
  disabled?: boolean;
}

interface ShareOption {
  id: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  action: () => void;
  color?: string;
}

export function EnhancedCVPreviewModal({ isOpen, onClose }: CVPreviewModalProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [zoomLevel, setZoomLevel] = useState(100);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [downloadStatus, setDownloadStatus] = useState<string | null>(null);
  const [shareStatus, setShareStatus] = useState<string | null>(null);

  // Available download formats
  const downloadFormats: DownloadFormat[] = [
    {
      id: "pdf",
      label: "PDF",
      icon: FileText,
      filename: "Jeremy_Wijaya_CV.pdf",
      path: "/Jeremy_CV_ATS_81025.pdf",
      primary: true,
    },
    {
      id: "docx",
      label: "DOCX",
      icon: FileText,
      filename: "Jeremy_Wijaya_CV.docx",
      path: "#", // Would need actual DOCX file
      disabled: true,
    },
  ];

  // Share options
  const shareOptions: ShareOption[] = [
    {
      id: "linkedin",
      label: "LinkedIn",
      icon: Linkedin,
      action: () => {
        window.open("https://linkedin.com/in/jeremy-wijaya", "_blank");
        setShareStatus("linkedin");
        setTimeout(() => setShareStatus(null), 2000);
      },
      color: "text-blue-600",
    },
    {
      id: "email",
      label: "Email",
      icon: Mail,
      action: () => {
        const subject = "Jeremy Wijaya - CV";
        const body = "Hi Jeremy, I'd like to connect regarding your CV.";
        window.open(`mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`);
        setShareStatus("email");
        setTimeout(() => setShareStatus(null), 2000);
      },
      color: "text-green-600",
    },
    {
      id: "copy",
      label: "Copy Link",
      icon: Link2,
      action: () => {
        navigator.clipboard.writeText(window.location.href);
        setShareStatus("copied");
        setTimeout(() => setShareStatus(null), 2000);
      },
      color: "text-purple-600",
    },
  ];

  // Zoom levels
  const zoomLevels = useMemo(() => [25, 50, 75, 100, 125, 150, 200], []);

  // Handle PDF loading
  useEffect(() => {
    if (isOpen) {
      setIsLoading(true);
      // Simulate PDF loading time
      const timer = setTimeout(() => {
        setIsLoading(false);
        setTotalPages(2); // Estimated pages
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  // Zoom controls
  const handleZoomIn = useCallback(() => {
    const currentIndex = zoomLevels.indexOf(zoomLevel);
    if (currentIndex < zoomLevels.length - 1) {
      setZoomLevel(zoomLevels[currentIndex + 1]);
    }
  }, [zoomLevel, zoomLevels]);

  const handleZoomOut = useCallback(() => {
    const currentIndex = zoomLevels.indexOf(zoomLevel);
    if (currentIndex > 0) {
      setZoomLevel(zoomLevels[currentIndex - 1]);
    }
  }, [zoomLevel, zoomLevels]);

  const handleZoomReset = () => {
    setZoomLevel(100);
  };

  // Page navigation
  const handlePreviousPage = useCallback(() => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  }, [currentPage]);

  const handleNextPage = useCallback(() => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  }, [currentPage, totalPages]);

  // Handle keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;

      switch (e.key) {
        case "Escape":
          onClose();
          break;
        case "+":
        case "=":
          handleZoomIn();
          break;
        case "-":
          handleZoomOut();
          break;
        case "ArrowLeft":
          handlePreviousPage();
          break;
        case "ArrowRight":
          handleNextPage();
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose, handleZoomIn, handleZoomOut, handlePreviousPage, handleNextPage]);

  // Download handler
  const handleDownload = (format: DownloadFormat) => {
    if (format.disabled) return;

    setDownloadStatus(format.id);

    // Create download link
    const link = document.createElement("a");
    link.href = format.path;
    link.download = format.filename;
    link.target = "_blank";
    link.click();

    // Clear status after delay
    setTimeout(() => setDownloadStatus(null), 2000);
  };

  // Print handler
  const handlePrint = () => {
    const printWindow = window.open("/Jeremy_CV_ATS_81025.pdf", "_blank");
    if (printWindow) {
      printWindow.onload = () => {
        printWindow.print();
      };
    }
  };

  // Fullscreen toggle
  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.95, opacity: 0, y: 20 }}
          animate={{
            scale: 1,
            opacity: 1,
            y: 0,
            transition: { type: "spring", damping: 25, stiffness: 300 }
          }}
          exit={{
            scale: 0.95,
            opacity: 0,
            y: 20,
            transition: { duration: 0.2 }
          }}
          className={`relative w-full max-w-7xl ${
            isFullscreen ? "h-[95vh]" : "max-h-[90vh]"
          } bg-background/95 backdrop-blur-xl border border-border/50 rounded-2xl shadow-2xl overflow-hidden`}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Enhanced Header */}
          <div className="relative bg-gradient-to-r from-primary/10 via-background to-primary/5 backdrop-blur-xl border-b border-border/50">
            <div className="flex items-center justify-between p-6">
              {/* Left Section - Profile Info */}
              <div className="flex items-center gap-4">
                {/* Profile Avatar */}
                <div className="relative">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary/20 to-primary/5 p-0.5">
                    <div className="w-full h-full rounded-full bg-background/80 backdrop-blur-sm flex items-center justify-center">
                      <User className="w-8 h-8 text-primary" />
                    </div>
                  </div>
                  <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-500 rounded-full border-2 border-background" />
                </div>

                {/* Name and Title */}
                <div>
                  <h1 className="text-2xl font-bold text-foreground mb-1">
                    Jeremy Wijaya
                  </h1>
                  <div className="flex items-center gap-3 text-sm text-muted-foreground">
                    <span>AI Engineer & Full-Stack Developer</span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      Updated Oct 2024
                    </span>
                  </div>

                  {/* Status Badges */}
                  <div className="flex items-center gap-2 mt-2">
                    <Badge variant="secondary" className="text-xs">
                      <Award className="w-3 h-3 mr-1" />
                      3.96 GPA
                    </Badge>
                    <Badge variant="outline" className="text-xs">
                      <CheckCircle className="w-3 h-3 mr-1" />
                      Available for work
                    </Badge>
                  </div>
                </div>
              </div>

              {/* Right Section - Actions */}
              <div className="flex items-center gap-2">
                {/* Device Preview Toggle */}
                <div className="hidden md:flex items-center gap-1 bg-muted/50 rounded-lg p-1">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-8 w-8 p-0"
                    onClick={() => setZoomLevel(100)}
                  >
                    <Smartphone className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-8 w-8 p-0"
                    onClick={() => setZoomLevel(125)}
                  >
                    <Tablet className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-8 w-8 p-0"
                    onClick={() => setZoomLevel(100)}
                  >
                    <Monitor className="w-4 h-4" />
                  </Button>
                </div>

                {/* Close Button */}
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={onClose}
                  className="h-10 w-10 p-0 rounded-full hover:bg-destructive/10 hover:text-destructive"
                >
                  <X className="w-5 h-5" />
                </Button>
              </div>
            </div>
          </div>

          {/* PDF Preview Area */}
          <div className={`flex flex-col ${isFullscreen ? "h-[calc(95vh-8rem)]" : "h-[calc(90vh-8rem)]"}`}>
            {/* PDF Controls */}
            <div className="flex items-center justify-between p-4 bg-muted/30 border-b border-border/30">
              {/* Navigation Controls */}
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handlePreviousPage}
                  disabled={currentPage <= 1}
                  className="h-8 w-8 p-0"
                >
                  <ChevronLeft className="w-4 h-4" />
                </Button>

                <div className="flex items-center gap-1 px-3 py-1 bg-background rounded-md border border-border/50">
                  <span className="text-sm font-medium">{currentPage}</span>
                  <span className="text-sm text-muted-foreground">/</span>
                  <span className="text-sm text-muted-foreground">{totalPages || "?"}</span>
                </div>

                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleNextPage}
                  disabled={currentPage >= totalPages}
                  className="h-8 w-8 p-0"
                >
                  <ChevronRight className="w-4 h-4" />
                </Button>
              </div>

              {/* Zoom Controls */}
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleZoomOut}
                  disabled={zoomLevel <= 25}
                  className="h-8 w-8 p-0"
                >
                  <ZoomOut className="w-4 h-4" />
                </Button>

                <div className="flex items-center gap-1 px-3 py-1 bg-background rounded-md border border-border/50">
                  <span className="text-sm font-medium">{zoomLevel}%</span>
                </div>

                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleZoomIn}
                  disabled={zoomLevel >= 200}
                  className="h-8 w-8 p-0"
                >
                  <ZoomIn className="w-4 h-4" />
                </Button>

                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleZoomReset}
                  className="h-8 w-8 p-0"
                >
                  <span className="text-xs">Reset</span>
                </Button>
              </div>

              {/* View Controls */}
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={toggleFullscreen}
                  className="h-8 w-8 p-0"
                >
                  {isFullscreen ? (
                    <Minimize2 className="w-4 h-4" />
                  ) : (
                    <Maximize2 className="w-4 h-4" />
                  )}
                </Button>
              </div>
            </div>

            {/* PDF Content */}
            <div className="flex-1 overflow-auto bg-gray-50 dark:bg-gray-900 p-4">
              {isLoading ? (
                <div className="flex flex-col items-center justify-center h-full">
                  <Loader2 className="w-8 h-8 animate-spin text-primary mb-4" />
                  <p className="text-muted-foreground">Loading CV preview...</p>
                </div>
              ) : (
                <div className="flex justify-center">
                  <div
                    className="bg-white shadow-lg rounded-lg overflow-hidden"
                    style={{
                      transform: `scale(${zoomLevel / 100})`,
                      transformOrigin: "top center",
                      transition: "transform 0.2s ease-out"
                    }}
                  >
                    <iframe
                      src={`/Jeremy_CV_ATS_81025.pdf#page=${currentPage}&view=FitV`}
                      className="w-full"
                      style={{
                        width: "600px",
                        height: `${800 * (zoomLevel / 100)}px`,
                        minHeight: "600px"
                      }}
                      title="Jeremy Wijaya CV Preview"
                      onLoad={() => setIsLoading(false)}
                    />
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Action Footer */}
          <div className="bg-gradient-to-r from-muted/50 to-background border-t border-border/50 p-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              {/* Download Formats */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
                <span className="text-sm font-medium text-foreground">Download:</span>
                <div className="flex gap-2">
                  {downloadFormats.map((format) => {
                    const Icon = format.icon;
                    const isDownloading = downloadStatus === format.id;

                    return (
                      <motion.div key={format.id} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                        <Button
                          variant={format.primary ? "default" : "outline"}
                          size="sm"
                          onClick={() => handleDownload(format)}
                          disabled={format.disabled || isDownloading}
                          className="gap-2 min-w-[80px]"
                        >
                          {isDownloading ? (
                            <Loader2 className="w-3 h-3 animate-spin" />
                          ) : (
                            <Icon className="w-3 h-3" />
                          )}
                          {isDownloading ? "Downloading..." : format.label}
                          {format.disabled && (
                            <span className="text-xs text-muted-foreground ml-1">(Soon)</span>
                          )}
                        </Button>
                      </motion.div>
                    );
                  })}

                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={handlePrint}
                      className="gap-2"
                    >
                      <Printer className="w-3 h-3" />
                      Print
                    </Button>
                  </motion.div>
                </div>
              </div>

              {/* Share Options */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
                <span className="text-sm font-medium text-foreground">Share:</span>
                <div className="flex gap-2">
                  {shareOptions.map((option) => {
                    const Icon = option.icon;
                    const isActive = shareStatus === option.id;

                    return (
                      <motion.div key={option.id} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={option.action}
                          className={`gap-2 ${option.color} ${isActive ? "bg-current/10" : ""}`}
                        >
                          {isActive ? (
                            <>
                              <CheckCircle className="w-3 h-3" />
                              {option.id === "copied" ? "Copied!" : "Shared!"}
                            </>
                          ) : (
                            <>
                              <Icon className="w-3 h-3" />
                              {option.label}
                            </>
                          )}
                        </Button>
                      </motion.div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Status Messages */}
            <div className="mt-4 flex justify-center">
              {downloadStatus && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center gap-2 px-3 py-2 bg-green-500/10 text-green-600 rounded-md text-sm"
                >
                  <CheckCircle className="w-4 h-4" />
                  Download started successfully
                </motion.div>
              )}

              {shareStatus && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center gap-2 px-3 py-2 bg-blue-500/10 text-blue-600 rounded-md text-sm"
                >
                  <CheckCircle className="w-4 h-4" />
                  {shareStatus === "copied" ? "Link copied to clipboard!" : "Opening share dialog..."}
                </motion.div>
              )}
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}