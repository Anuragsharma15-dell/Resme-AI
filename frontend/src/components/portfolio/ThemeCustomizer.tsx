import { motion } from "framer-motion";
import { Palette, Type, Layout } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface ThemeCustomizerProps {
  themeColor: string;
  fontFamily: string;
  template: string;
  onThemeColorChange: (color: string) => void;
  onFontFamilyChange: (font: string) => void;
  onTemplateChange: (template: string) => void;
}

const COLORS = [
  { name: "Purple", value: "#8B5CF6" },
  { name: "Blue", value: "#3B82F6" },
  { name: "Cyan", value: "#06B6D4" },
  { name: "Green", value: "#10B981" },
  { name: "Orange", value: "#F59E0B" },
  { name: "Pink", value: "#EC4899" },
  { name: "Red", value: "#EF4444" },
  { name: "Indigo", value: "#6366F1" },
  { name: "Teal", value: "#14B8A6" },
  { name: "Rose", value: "#F43F5E" },
  { name: "Black", value: "#000000" },
  { name: "White", value: "#FFFFFF" },
];

const FONTS = [
  { name: "Inter", value: "Inter" },
  { name: "Roboto", value: "Roboto" },
  { name: "Open Sans", value: "Open Sans" },
  { name: "Lato", value: "Lato" },
  { name: "Poppins", value: "Poppins" },
  { name: "Montserrat", value: "Montserrat" },
  { name: "Playfair Display", value: "Playfair Display" },
  { name: "JetBrains Mono", value: "JetBrains Mono" },
  { name: "Source Code Pro", value: "Source Code Pro" },
  { name: "Merriweather", value: "Merriweather" },
];

const TEMPLATES = [
  { name: "Modern Dark", value: "modern-dark" },
  { name: "Classic B&W", value: "classic-bw" },
  { name: "Clean Light", value: "clean-light" },
  { name: "Creative Gradient", value: "creative-gradient" },
  { name: "Minimal Pro", value: "minimal-pro" },
  { name: "Developer Code", value: "developer-code" },
  { name: "Tech Stack", value: "tech-stack" },
  { name: "Executive", value: "executive" },
];

const ThemeCustomizer = ({
  themeColor,
  fontFamily,
  template,
  onThemeColorChange,
  onFontFamilyChange,
  onTemplateChange,
}: ThemeCustomizerProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass-card rounded-xl p-4 space-y-4"
    >
      <h3 className="font-semibold flex items-center gap-2">
        <Palette className="w-4 h-4 text-primary" />
        Customize Appearance
      </h3>

      {/* Color Picker */}
      <div className="space-y-2">
        <Label className="text-sm">Theme Color</Label>
        <div className="grid grid-cols-6 gap-2">
          {COLORS.map((color) => (
            <button
              key={color.value}
              onClick={() => onThemeColorChange(color.value)}
              className={`w-8 h-8 rounded-full border-2 transition-all ${
                themeColor === color.value
                  ? "border-primary scale-110"
                  : "border-transparent hover:scale-105"
              }`}
              style={{ 
                backgroundColor: color.value,
                boxShadow: color.value === "#FFFFFF" ? "inset 0 0 0 1px rgba(0,0,0,0.1)" : undefined
              }}
              title={color.name}
            />
          ))}
        </div>
        <div className="flex items-center gap-2 mt-2">
          <Label className="text-xs text-muted-foreground">Custom:</Label>
          <input
            type="color"
            value={themeColor}
            onChange={(e) => onThemeColorChange(e.target.value)}
            className="w-8 h-8 rounded cursor-pointer bg-transparent"
          />
          <span className="text-xs font-mono text-muted-foreground">{themeColor}</span>
        </div>
      </div>

      {/* Font Selector */}
      <div className="space-y-2">
        <Label className="text-sm flex items-center gap-2">
          <Type className="w-4 h-4" />
          Font Family
        </Label>
        <Select value={fontFamily} onValueChange={onFontFamilyChange}>
          <SelectTrigger>
            <SelectValue placeholder="Select font" />
          </SelectTrigger>
          <SelectContent>
            {FONTS.map((font) => (
              <SelectItem key={font.value} value={font.value}>
                <span style={{ fontFamily: font.value }}>{font.name}</span>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Template Selector */}
      <div className="space-y-2">
        <Label className="text-sm flex items-center gap-2">
          <Layout className="w-4 h-4" />
          Template Style
        </Label>
        <Select value={template} onValueChange={onTemplateChange}>
          <SelectTrigger>
            <SelectValue placeholder="Select template" />
          </SelectTrigger>
          <SelectContent>
            {TEMPLATES.map((t) => (
              <SelectItem key={t.value} value={t.value}>
                {t.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </motion.div>
  );
};

export default ThemeCustomizer;