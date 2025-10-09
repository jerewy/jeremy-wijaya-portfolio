"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ExternalLink,
  X,
  Download,
  Calendar,
  Award,
  ArrowRight,
  FileText,
  Clock,
  Eye,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface CertificationCardProps {
  id: string;
  title: string;
  issuer: string;
  issueDate: string;
  credentialId?: string;
  credentialUrl?: string;
  previewImage: string;
  description?: string;
  className?: string;
}

export function CertificationCard({
  title,
  issuer,
  issueDate,
  credentialId,
  credentialUrl,
  previewImage,
  description,
  className = "",
}: CertificationCardProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <motion.div
        className={`group cursor-pointer ${className}`}
        whileHover={{ y: -5 }}
        whileTap={{ scale: 0.98 }}
        onClick={() => setIsModalOpen(true)}
      >
        <Card className="h-full border-border/50 bg-card/50 backdrop-blur-sm transition-all duration-300 hover:shadow-lg hover:border-primary/50">
          <CardHeader className="p-4 pb-2">
            <div className="flex items-start justify-between gap-3">
              <div className="flex-1">
                <CardTitle className="text-lg leading-tight mb-1 line-clamp-2">
                  {title}
                </CardTitle>
                <CardDescription className="text-sm font-medium text-muted-foreground">
                  {issuer}
                </CardDescription>
              </div>
              <div className="flex-shrink-0">
                <Award className="w-8 h-8 text-primary/60" />
              </div>
            </div>
          </CardHeader>

          <CardContent className="p-4 pt-2">
            <div className="flex items-center gap-2 text-xs text-muted-foreground mb-3">
              <Calendar className="w-3 h-3" />
              {issueDate}
            </div>

            {description && (
              <p className="text-sm text-muted-foreground line-clamp-3 mb-4">
                {description}
              </p>
            )}

            <div className="flex items-center justify-between">
              <div className="flex gap-2">
                {credentialUrl && (
                  <Button
                    size="sm"
                    variant="outline"
                    className="h-8 px-3 text-xs"
                    onClick={(e) => {
                      e.stopPropagation();
                      window.open(credentialUrl, "_blank");
                    }}
                  >
                    <ExternalLink className="w-3 h-3 mr-1" />
                    Verify
                  </Button>
                )}
              </div>

              <motion.div
                className="text-xs text-primary/60 font-medium"
                whileHover={{ scale: 1.05 }}
              >
                Click to preview →
              </motion.div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Modal/Preview */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
            onClick={() => setIsModalOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", damping: 20, stiffness: 300 }}
              className="relative max-w-4xl w-full max-h-[90vh] bg-background border rounded-lg shadow-2xl overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="relative p-4 sm:p-6 border-b bg-card/50">
                {/* Top-right status indicators */}
                <div className="absolute top-2 sm:top-4 right-2 sm:right-4 flex items-center gap-2 z-10">
                  <Badge
                    variant="outline"
                    className="text-xs gap-1 bg-amber-50/80 text-amber-700 border-amber-200 backdrop-blur-sm dark:bg-amber-950/50 dark:text-amber-400 dark:border-amber-800/50 shadow-sm"
                    aria-label="Preview mode - certificate is view only"
                  >
                    <Eye className="w-3 h-3" />
                    <span className="hidden sm:inline">Preview Only</span>
                    <span className="sm:hidden">Preview</span>
                  </Badge>

                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setIsModalOpen(false)}
                    className="h-8 w-8 p-0 hover:bg-destructive/10 hover:text-destructive"
                    aria-label="Close certificate preview"
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>

                <div className="pr-24 sm:pr-32">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <Award className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h2 className="text-lg sm:text-xl font-semibold text-foreground mb-2 truncate">
                        {title}
                      </h2>
                      <p className="text-sm text-muted-foreground font-medium mb-3">{issuer}</p>

                      {/* Certificate details - improved spacing */}
                      <div className="space-y-2 text-xs sm:text-sm text-muted-foreground">
                        <div className="flex items-center gap-2">
                          <Calendar className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
                          <span>{issueDate}</span>
                        </div>
                        {credentialId && (
                          <div className="flex items-center gap-2">
                            <Badge variant="outline" className="text-xs bg-muted/50">
                              ID: {credentialId}
                            </Badge>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* PDF Preview with Security */}
              <div className="p-4 sm:p-6 bg-card/20">
                <div className="relative w-full h-[60vh] rounded-lg bg-muted/30 overflow-hidden" onContextMenu={(e) => e.preventDefault()}>
                  {/* Subtle security overlay */}
                  <div className="absolute inset-0 bg-gradient-to-b from-amber-500/5 to-transparent pointer-events-none z-10" />

                  <iframe
                    src={previewImage}
                    className="w-full h-full border-0 rounded-lg"
                    title={`${title} Certificate - Preview Only`}
                    loading="lazy"
                  />
                </div>
              </div>

              {/* Actions - Enhanced with status indicator */}

              {/*
                ALTERNATIVE PLACEMENT OPTIONS:

                1. Remove header badge and use only this footer badge
                2. Add subtle overlay on PDF preview:
                   <div className="absolute top-4 left-4 z-10">
                     <Badge variant="outline" className="bg-amber-50/80 text-amber-700 backdrop-blur-sm">
                       <Eye className="w-3 h-3" /> Preview Only
                     </Badge>
                   </div>
                3. Add corner ribbon badge:
                   <div className="absolute top-0 right-0 w-32 h-32 overflow-hidden">
                     <div className="absolute top-4 right-[-35px] rotate-45 bg-amber-500 text-white text-xs px-8 py-1">
                       PREVIEW
                     </div>
                   </div>
              */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4 sm:p-6 border-t bg-card/50">
                <div className="text-sm text-muted-foreground max-w-md">
                  <div className="flex items-center gap-2 mb-2">
                    <Badge variant="outline" className="text-xs gap-1 bg-amber-50/80 text-amber-700 border-amber-200 dark:bg-amber-950/50 dark:text-amber-400 dark:border-amber-800/50">
                      <Eye className="w-3 h-3" />
                      Preview Mode
                    </Badge>
                  </div>
                  <p className="font-medium text-foreground mb-1">Credential Verification</p>
                  <p className="text-xs md:text-sm">
                    This certificate can be verified through the official issuer platform.
                    Download functionality is disabled for security purposes.
                  </p>
                </div>

                <div className="flex gap-3">
                  {credentialUrl && (
                    <Button
                      onClick={() => window.open(credentialUrl, "_blank")}
                      className="gap-2"
                      size="sm"
                    >
                      <ExternalLink className="w-4 h-4" />
                      Verify Credential
                    </Button>
                  )}

                  {credentialId && (
                    <Button
                      variant="outline"
                      onClick={() => {
                        navigator.clipboard.writeText(credentialId);
                      }}
                      className="gap-2"
                      size="sm"
                    >
                      <FileText className="w-4 h-4" />
                      Copy ID
                    </Button>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

// Enhanced CV Preview Modal Component (matching certification pattern)
function CVPreviewModal({
  isOpen,
  onClose,
  isPdfLoading,
  onPdfLoad,
}: {
  isOpen: boolean;
  onClose: () => void;
  isPdfLoading: boolean;
  onPdfLoad: () => void;
}) {
  const pdfUrl = "/Jeremy_CV_ATS_81025.pdf";
  const currentDate = new Date().toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
  });

  const handlePdfLoad = () => {
    onPdfLoad();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ type: "spring", damping: 20, stiffness: 300 }}
            className="relative max-w-4xl w-full h-[90vh] max-h-[90vh] sm:h-[85vh] sm:max-h-[85vh] bg-background border rounded-lg shadow-2xl overflow-hidden flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Enhanced Header with staggered animation */}
            <motion.div
              className="flex flex-col sm:flex-row sm:items-center justify-between p-4 md:p-6 border-b bg-card/50 gap-4"
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.1 }}
            >
              <div className="flex items-center gap-3 md:gap-4">
                <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <FileText className="w-5 h-5 md:w-6 md:h-6 text-primary" />
                </div>
                <div className="min-w-0 flex-1">
                  <h2 className="text-lg md:text-xl font-semibold text-foreground mb-1 truncate">
                    Jeremy Wijaya - Curriculum Vitae
                  </h2>
                  <p className="text-sm text-muted-foreground truncate">
                    AI Engineer & Full-Stack Developer
                  </p>
                  <div className="flex items-center gap-3 md:gap-4 mt-1 text-xs text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      <span className="hidden sm:inline">Updated:</span>
                      {currentDate}
                    </div>
                    <div className="flex items-center gap-1">
                      <FileText className="w-3 h-3" />4 pages • PDF
                    </div>
                  </div>
                </div>
              </div>

              <Button
                variant="ghost"
                size="sm"
                onClick={onClose}
                className="h-8 w-8 p-0 hover:bg-destructive/10 hover:text-destructive flex-shrink-0"
              >
                <X className="w-4 h-4" />
              </Button>
            </motion.div>

            {/* Enhanced PDF Preview with loading state */}
            <motion.div
              className="flex-1 p-4 md:p-6 bg-card/20 overflow-hidden flex flex-col min-h-0"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <div className="relative w-full h-full min-h-0 rounded-lg bg-muted/30 overflow-hidden">
                {isPdfLoading && (
                  <div className="absolute inset-0 flex items-center justify-center bg-muted/50 backdrop-blur-sm z-10">
                    <div className="flex flex-col items-center gap-3">
                      <motion.div
                        className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full"
                        animate={{ rotate: 360 }}
                        transition={{
                          duration: 1,
                          repeat: Infinity,
                          ease: "linear",
                        }}
                      />
                      <p className="text-sm text-muted-foreground">
                        Loading CV...
                      </p>
                    </div>
                  </div>
                )}
                <iframe
                  src={pdfUrl}
                  className="w-full h-full border-0 rounded-lg"
                  title="Jeremy Wijaya - Curriculum Vitae"
                  onLoad={handlePdfLoad}
                  onError={() => onPdfLoad()}
                  loading="lazy"
                />
              </div>
            </motion.div>

            {/* Enhanced Actions with mobile responsiveness - Fixed Footer */}
            <motion.div
              className="flex flex-col md:flex-row items-start md:items-center justify-between p-4 md:p-6 border-t bg-card/50 gap-4 flex-shrink-0"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <div className="text-sm text-muted-foreground max-w-md">
                <p className="font-medium text-foreground mb-1">
                  Professional Overview
                </p>
                <p className="text-xs md:text-sm">
                  Complete overview of my experience in AI engineering,
                  full-stack development, and technical leadership.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
                <Button
                  onClick={() => window.open(pdfUrl, "_blank")}
                  className="gap-2 w-full sm:w-auto"
                  variant="outline"
                  size="sm"
                >
                  <ExternalLink className="w-4 h-4" />
                  <span className="hidden sm:inline">Full Screen</span>
                  <span className="sm:hidden">Fullscreen</span>
                </Button>

                <Button
                  onClick={() => {
                    const link = document.createElement("a");
                    link.href = pdfUrl;
                    link.download = "Jeremy_Wijaya_CV.pdf";
                    link.click();
                  }}
                  className="gap-2 w-full sm:w-auto"
                  size="sm"
                >
                  <Download className="w-4 h-4" />
                  Download CV
                </Button>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// Enhanced CV Download Button Component (matching certification pattern)
export function CVDownloadButton() {
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [isPdfLoading, setIsPdfLoading] = useState(false);

  return (
    <>
      <motion.div
        className="group cursor-pointer relative"
        whileHover={{ y: -5 }}
        whileTap={{ scale: 0.98 }}
        onClick={() => {
          setIsPreviewOpen(true);
          setIsPdfLoading(true);
        }}
      >
        {/* Hover gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-primary/5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        <Card className="h-full border-border/50 bg-card/50 backdrop-blur-sm transition-all duration-300 hover:shadow-lg hover:border-primary/50 relative overflow-hidden">
          <CardHeader className="p-4 pb-2 relative z-10">
            <div className="flex items-start justify-between gap-3">
              <div className="flex-1">
                <CardTitle className="text-lg leading-tight mb-1 line-clamp-2">
                  Jeremy Wijaya - Curriculum Vitae
                </CardTitle>
                <CardDescription className="text-sm font-medium text-muted-foreground">
                  AI Engineer & Full-Stack Developer
                </CardDescription>
              </div>
              <div className="flex-shrink-0">
                <motion.div
                  className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center"
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.6 }}
                >
                  <FileText className="w-5 h-5 text-primary" />
                </motion.div>
              </div>
            </div>
          </CardHeader>

          <CardContent className="p-4 pt-2 relative z-10">
            <div className="flex items-center gap-4 text-xs text-muted-foreground mb-3">
              <div className="flex items-center gap-1">
                <Calendar className="w-3 h-3" />
                Updated:{" "}
                {new Date().toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                })}
              </div>
              <div className="flex items-center gap-1">
                <FileText className="w-3 h-3" />1 pages
              </div>
            </div>

            <p className="text-sm text-muted-foreground line-clamp-3 mb-4">
              Complete overview of my professional experience, technical skills,
              and achievements in AI engineering and full-stack development.
            </p>

            <div className="flex items-center justify-between">
              <div className="flex gap-2 flex-wrap">
                <Badge variant="secondary" className="text-xs gap-1">
                  <FileText className="w-3 h-3" />
                  PDF
                </Badge>
                <Badge variant="outline" className="text-xs gap-1">
                  <Clock className="w-3 h-3" />3 min read
                </Badge>
                <Badge
                  variant="outline"
                  className="text-xs gap-1 text-green-600 border-green-600/20"
                >
                  English
                </Badge>
              </div>

              <motion.div
                className="text-xs text-primary/60 font-medium flex items-center gap-1"
                whileHover={{ scale: 1.05, x: 2 }}
              >
                <span>Click to preview</span>
                <ArrowRight className="w-3 h-3" />
              </motion.div>
            </div>
          </CardContent>

          {/* Subtle background pattern */}
          <div className="absolute inset-0 opacity-5 pointer-events-none">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-background/20" />
          </div>
        </Card>
      </motion.div>

      <CVPreviewModal
        isOpen={isPreviewOpen}
        onClose={() => {
          setIsPreviewOpen(false);
          setIsPdfLoading(false);
        }}
        isPdfLoading={isPdfLoading}
        onPdfLoad={() => setIsPdfLoading(false)}
      />
    </>
  );
}
