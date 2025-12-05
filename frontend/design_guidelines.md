# Hyena Footprint Identification - Design Guidelines

## Design Approach

**System**: Material Design principles with nature/wildlife aesthetic
**Rationale**: This scientific utility tool requires clarity, reliability, and trust. Material Design provides the structure for data-heavy interfaces while allowing wildlife imagery to create context and engagement.

## Core Design Elements

### Typography
- **Primary Font**: Inter or Roboto (via Google Fonts CDN)
- **Accent Font**: Space Grotesk for headers
- **Hierarchy**:
  - H1: 3xl to 4xl, bold, for main heading
  - H2: 2xl, semibold, for section titles
  - Body: base to lg, regular, for descriptions
  - Data/Results: xl to 2xl, medium, for percentage displays

### Layout System
**Spacing Units**: Tailwind's 4, 8, 12, 16, 24 units (p-4, h-8, m-12, etc.)
- Container: max-w-6xl centered
- Vertical rhythm: py-12 to py-16 for sections
- Component spacing: gap-6 to gap-8 for grids
- Card padding: p-6 to p-8

### Page Structure

**Hero Section (40vh)**
- Wildlife/savanna background image with overlay
- Centered headline: "Hyena Footprint Identification"
- Subheading explaining the tool's purpose
- Scroll indicator

**Upload Section**
- Two-column layout on desktop (md:grid-cols-2)
- Left: Large drag-and-drop zone with dashed border, upload icon, and instructions
- Right: Upload guidelines card (supported formats, recommended image quality, tips for best results)
- Below columns: File input button as alternative method
- Mobile: Single column stack

**Preview Section** (appears after upload)
- Full-width container with max-w-4xl
- Uploaded image preview (max-h-96, object-contain)
- Image metadata display (filename, size)
- Action buttons: "Analyze Footprint" (primary), "Upload Different Image" (secondary)

**Results Section**
- Card-based layout with elevation
- Header: "Analysis Results" with timestamp
- Main results: List/grid of hyena matches showing:
  - Hyena identifier/name (if available)
  - Large percentage display with progress bar visualization
  - Confidence indicator
- Sort by highest to lowest percentage
- Visual treatment: Use progress bars or radial charts for percentages
- Footer: "Upload Another Footprint" button

**Loading State**
- Full-screen overlay with semi-transparent backdrop
- Centered loading spinner with wildlife icon
- Status text: "Analyzing footprint pattern..."
- Progress indicator if API provides progress updates

### Component Library

**Upload Zone**
- Rounded borders (rounded-xl)
- Dashed border treatment
- Hover state: subtle scale and border color change
- Active drag state: border solidifies, background tint
- Icon: Large cloud upload or footprint icon
- Text hierarchy: Primary instruction + secondary format details

**Results Cards**
- Clean white cards with subtle shadow
- Rounded corners (rounded-lg)
- Consistent padding (p-6)
- Border or subtle background for separation
- Progress bars: Full-width, rounded, with gradient fill based on percentage

**Buttons**
- Primary: Solid with medium rounding (rounded-md)
- Secondary: Outlined variant
- Icon buttons for secondary actions
- Consistent sizing: px-6 py-3 for main CTAs

**Status Indicators**
- Badge components for metadata (file type, status)
- Percentage displays with large numbers and unit labels
- Icon + text combinations for guidelines

### Images

**Hero Background**: Wide savanna landscape at golden hour or wildlife conservation setting (subtle, not overwhelming). The background should have a gradient overlay to ensure text readability.

**Empty State Icons**: Footprint icon or upload cloud icon for drag-and-drop zone

**Results Enhancement**: Small hyena silhouette icons next to results (optional but adds thematic consistency)

### Responsive Behavior
- Desktop (lg): Two-column upload, side-by-side results
- Tablet (md): Maintain two-column where appropriate, reduce spacing
- Mobile (base): Single column stack, full-width components, adjusted typography scale

### Accessibility
- Clear focus states on all interactive elements
- Adequate color contrast for all text
- Descriptive alt text for images
- ARIA labels for upload zone and results
- Keyboard navigation support

### Animations
**Minimal and purposeful only**:
- Smooth fade-in for results section
- Loading spinner rotation
- Subtle scale on button hover
- Progress bar fill animation