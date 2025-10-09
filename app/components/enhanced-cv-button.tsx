"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Download,
  Eye,
  FileText,
  Clock,
  Users,
  Award,
  Sparkles,
  ArrowRight,
  Zap,
  CheckCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { EnhancedCVPreviewModal } from "./enhanced-cv-modal";

interface EnhancedCVButtonProps {
  className?: string;
  showPreview?: boolean;
  variant?: "default" | "compact" | "featured";
}

export function EnhancedCVButton({
  className = "",
  showPreview = true,
  variant = "default",
}: EnhancedCVButtonProps) {
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const stats = [
    { icon: FileText, label: "2 Pages", value: "Comprehensive" },
    { icon: Clock, label: "3 min read", value: "Quick overview" },
    { icon: Award, label: "5+ Projects", value: "Real experience" },
    { icon: Users, label: "ATS Optimized", value: "Recruiter friendly" },
  ];

  const handleQuickDownload = () => {
    const link = document.createElement("a");
    link.href = "/Jeremy_CV_ATS_81025.pdf";
    link.download = "Jeremy_Wijaya_CV.pdf";
    link.click();
  };

  const openPreview = () => {
    setIsPreviewOpen(true);
  };

  if (variant === "compact") {
    return (
      <>
        <motion.div
          className={`relative group ${className}`}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onHoverStart={() => setIsHovered(true)}
          onHoverEnd={() => setIsHovered(false)}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-primary/10 rounded-lg blur-lg group-hover:blur-xl transition-all duration-300" />

          <Button
            size="lg"
            className="relative gap-3 bg-background/80 backdrop-blur-sm border border-border/50 hover:border-primary/50 hover:shadow-lg transition-all duration-300"
            onClick={openPreview}
          >
            <div className="relative">
              <FileText className="w-5 h-5 text-primary" />
              {isHovered && (
                <motion.div
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full"
                />
              )}
            </div>
            <span className="font-medium">View My CV</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Button>
        </motion.div>

        {showPreview && (
          <EnhancedCVPreviewModal
            isOpen={isPreviewOpen}
            onClose={() => setIsPreviewOpen(false)}
          />
        )}
      </>
    );
  }

  if (variant === "featured") {
    return (
      <>
        <motion.div
          className={`relative ${className}`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Animated background effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary/80 to-primary/60 rounded-2xl blur-xl opacity-20 group-hover:opacity-30 transition-opacity duration-300" />

          <motion.div
            className="relative bg-background/80 backdrop-blur-xl border border-border/50 rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300"
            whileHover={{ scale: 1.02, y: -5 }}
            whileTap={{ scale: 0.98 }}
          >
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary/20 to-primary/5 p-0.5">
                    <div className="w-full h-full rounded-xl bg-background/80 backdrop-blur-sm flex items-center justify-center">
                      <FileText className="w-7 h-7 text-primary" />
                    </div>
                  </div>
                  <motion.div
                    className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-background"
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                </div>

                <div>
                  <h3 className="text-xl font-bold text-foreground mb-1">
                    Professional CV
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Complete overview of skills & experience
                  </p>
                </div>
              </div>

              <Badge variant="secondary" className="gap-1">
                <Sparkles className="w-3 h-3" />
                Updated Oct 2024
              </Badge>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 gap-3 mb-6">
              {stats.map((stat, index) => {
                const Icon = stat.icon;
                return (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center gap-3 p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors"
                  >
                    <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                      <Icon className="w-4 h-4 text-primary" />
                    </div>
                    <div>
                      <div className="text-xs text-muted-foreground">{stat.label}</div>
                      <div className="text-sm font-medium text-foreground">{stat.value}</div>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3">
              <Button
                size="lg"
                className="flex-1 gap-2 bg-primary hover:bg-primary/90"
                onClick={openPreview}
              >
                <Eye className="w-4 h-4" />
                Preview CV
                <ArrowRight className="w-4 h-4" />
              </Button>

              <Button
                variant="outline"
                size="lg"
                onClick={handleQuickDownload}
                className="gap-2"
              >
                <Download className="w-4 h-4" />
                Quick Download
              </Button>
            </div>

            {/* Trust indicators */}
            <div className="mt-6 pt-4 border-t border-border/30">
              <div className="flex items-center justify-between text-xs text-muted-foreground">
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-1">
                    <CheckCircle className="w-3 h-3 text-green-500" />
                    ATS Optimized
                  </div>
                  <div className="flex items-center gap-1">
                    <CheckCircle className="w-3 h-3 text-green-500" />
                    PDF Format
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  <Zap className="w-3 h-3 text-yellow-500" />
                  Instant download
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {showPreview && (
          <EnhancedCVPreviewModal
            isOpen={isPreviewOpen}
            onClose={() => setIsPreviewOpen(false)}
          />
        )}
      </>
    );
  }

  return (
    <>
      <motion.div
        className={`relative group w-full ${className}`}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
      >
        {/* Background gradient effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-primary/10 rounded-lg blur-lg group-hover:blur-xl transition-all duration-300" />

        <motion.div
          className="relative border border-border/50 bg-card/50 backdrop-blur-sm rounded-lg p-6 hover:shadow-lg transition-all duration-300 cursor-pointer overflow-hidden"
          onClick={openPreview}
        >
          {/* Hover effect overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

          {/* Main content */}
          <div className="relative">
            <div className="flex items-center gap-4 mb-4">
              <motion.div
                className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center"
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.6 }}
              >
                <Download className="w-6 h-6 text-primary" />
              </motion.div>

              <div className="flex-1">
                <h3 className="text-lg font-semibold text-foreground mb-1">
                  Download My CV
                </h3>
                <p className="text-sm text-muted-foreground">
                  Get the complete overview of my experience
                </p>
              </div>
            </div>

            {/* Features */}
            <div className="flex flex-wrap gap-2 mb-4">
              <Badge variant="secondary" className="text-xs">
                <FileText className="w-3 h-3 mr-1" />
                PDF Format
              </Badge>
              <Badge variant="outline" className="text-xs">
                <Clock className="w-3 h-3 mr-1" />
                3 min read
              </Badge>
              <Badge variant="outline" className="text-xs">
                <Award className="w-3 h-3 mr-1" />
                5+ Projects
              </Badge>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <span>Updated October 2024</span>
                {isHovered && (
                  <motion.div
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="flex items-center gap-1 text-green-600"
                  >
                    <CheckCircle className="w-3 h-3" />
                    Ready to download
                  </motion.div>
                )}
              </div>

              <motion.div
                className="flex items-center gap-2 text-xs text-primary font-medium group-hover:text-primary transition-colors"
                whileHover={{ x: 5 }}
              >
                <span>Preview</span>
                <ArrowRight className="w-3 h-3" />
              </motion.div>
            </div>
          </div>
        </motion.div>
      </motion.div>

      {showPreview && (
        <EnhancedCVPreviewModal
          isOpen={isPreviewOpen}
          onClose={() => setIsPreviewOpen(false)}
        />
      )}
    </>
  );
}