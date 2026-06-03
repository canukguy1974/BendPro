# BendPro™ – Execution Standard

A modern, glassmorphic web dashboard for metal fabrication workflow management, specifically designed to streamline bend-sheet generation for architectural and residential metal fabrication projects.

## Overview

**BendPro** is a Next.js-based application that helps metal fabrication teams manage templates, capture measurements, and generate bend sheets for doors, windows, fascia, parapets, and other architectural elements. It combines a sleek glassmorphic UI with a lightweight SQLite database backend to provide intuitive project management and material specification workflows.

### Key Features

- **Template Management**: Pre-configured templates for common project types (doors, windows, fascia, parapets)
- **Multi-Tool Workflow**: Switch between different element types with instant template loading
- **Capture Workflows**: Integration points for photo capture, QR marker scanning, and image uploads
- **Visual Measurement Display**: Real-time visualization of dimensions with calibration markers
- **Bend Sheet Generation**: Automatic bend sheet output with material specs and angle data
- **Project Tracking**: Maintain project states, material selections, and workflow status
- **Glassmorphic UI**: Modern, semi-transparent design with dark theme and brand-specific styling

---

## How It Works

### Architecture

BendPro follows a modern **Next.js App Router** architecture with:

- **Frontend**: React 19 with TypeScript, Tailwind CSS, and Lucide React icons
- **Backend**: Next.js API routes with Node.js runtime
- **Database**: SQLite with better-sqlite3 for fast, local data persistence
- **Styling**: Tailwind CSS with custom glassmorphism components and brand colors

### Data Flow

1. **User selects a tool type** (Door, Window, Fascia, etc.)
2. **Frontend fetches templates** via `/api/templates?type=<tool_type>`
3. **Backend queries SQLite database** and returns matching templates
4. **User selects or customizes template** with dimensions and materials
5. **Visual preview updates** with 2D representation and calibration markers
6. **Bend sheet data is prepared** with material specs, angles, and measurements
7. **User exports or generates** the bend sheet for production

### Core Components

#### Main UI (`src/app/bendpro/page.tsx`)
- **Left Sidebar**: Tool selector, capture controls, and template picker
- **Center Panel**: Large visual preview with dimension overlay and calibration guide
- **Right Sidebar**: Bend sheet summary, next actions, and status indicators
- **Header**: Branding, project controls, and quick-add buttons

#### Database Layer (`src/lib/db.ts`)
- **Initialization**: Auto-creates SQLite schema and seeds default templates on first run
- **Templates Table**: Stores template definitions with dimensions, materials, returns, and hems
- **Query Functions**: `getTemplates(templateType)` for filtering by tool type

#### API Route (`src/app/api/templates/route.ts`)
- **GET endpoint** returning templates filtered by query parameter
- Supports querying all templates or filtered by specific tool type

---

## How to Use

### Installation & Setup

1. **Clone the repository**:
   ```bash
   git clone https://github.com/canukguy1974/BendPro.git
   cd BendPro
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start development server**:
   ```bash
   npm run dev
   ```
   The app will be available at `http://localhost:3000`

### Quick Start

1. **Open the dashboard** at `http://localhost:3000`
2. **Select a tool type** from the left sidebar (Door, Window, Fascia, Parapet, More)
3. **Choose a template** from the Templates list (e.g., "Standard 8x7" for doors)
4. **View the measurements** in the center preview panel
5. **Capture workflow** – click "Take Photo", "Scan Marker", or "Upload Image" to start capture
6. **Generate bend sheet** – click the "NEXT" button to proceed with bend sheet generation

### Interface Overview

#### Left Sidebar

| Section | Function |
|---------|----------|
| **Tools** | Toggle between Door, Window, Fascia, Parapet, or More types |
| **Capture** | Trigger photo capture, marker scanning, or image uploads |
| **Templates** | Select from pre-configured templates for the active tool type |

#### Center Panel

| Section | Function |
|---------|----------|
| **Project Header** | Displays active tool type and project name |
| **Visual Preview** | 2D representation with dimension overlay and calibration marker |
| **Opening Size** | Width and height specifications in inches |
| **Materials** | Listed materials (Aluminum, returns, hems) |
| **Workflow Status** | Visual locks and confirmations (e.g., "Scan marker confirmed") |

#### Right Sidebar

| Section | Function |
|---------|----------|
| **Bend Sheet** | Summary of bends (Left jamb, Head, Right jamb) with angles |
| **Next Action** | Prominent "Generate Bend Sheet" button with custom notes |
| **Status** | Calibration status, material selection, returns, hem specifications |

### Available Templates

The database comes pre-seeded with templates for common project types:

**Doors**
- Standard 8x7 (96" × 84")
- Single 9x7 (108" × 84")
- Double 16x7 (192" × 84")

**Windows**
- Picture Window 4x3 (48" × 36")
- Casement 3x4 (36" × 48")

**Fascia**
- Fascia 8 in (96" × 8")

**Parapet**
- Parapet Cap 10 in (120" × 10")

### Customization

#### Adding New Templates

Edit `src/lib/db.ts` and add to the seed array (lines 56–127):

```typescript
{
  template_type: "door",
  name: "Custom Double 18x8",
  default_width: 216,
  default_height: 96,
  materials_json: JSON.stringify(["Aluminum", "1.25 in Returns", "5/8 in Hem"]),
  returns_in: 1.25,
  hem_in: 0.625,
  notes: "Extra-large commercial garage door opening.",
},
```

Restart the dev server; the database will reinitialize if empty.

#### Customizing Brand Colors

Edit `tailwind.config.ts` to update brand colors:

```typescript
colors: {
  "bp-yellow": "#FEBD17",        // Primary brand yellow
  "bp-yellow-strong": "#f4a900", // Darker variant
  "bp-yellow-dim": "#c28c0b",    // Dimmed variant
},
```

#### Modifying Glassmorphic Styles

Global glass component styles are defined in `src/app/globals.css`:

```css
.glass-panel {
  @apply border border-white/10 bg-white/5 backdrop-blur-xl;
}
.glass-panel-strong {
  @apply border border-white/15 bg-white/10 backdrop-blur-2xl;
}
```

### Build & Deployment

**Build for production**:
```bash
npm run build
npm run start
```

**Lint code**:
```bash
npm lint
```

### Environment Variables

Configure optional environment variables in `.env.local`:

| Variable | Description | Default |
|----------|-------------|---------|
| `BENDPRO_DB_PATH` | Custom SQLite database path | `./data/bendpro.db` |

---

## Project Structure

```
BendPro/
├── src/
│   ├── app/
│   │   ├── bendpro/
│   │   │   └── page.tsx           # Main dashboard page
│   │   ├── api/
│   │   │   └── templates/
│   │   │       └── route.ts       # Template API endpoint
│   │   ├── globals.css            # Global styles & glass components
│   │   ├── layout.tsx             # Root layout with fonts
│   │   └── page.tsx               # Home router
│   ├── lib/
│   │   └── db.ts                  # SQLite database layer & templates
│   └── components/                # (Reserved for future component library)
├── public/
│   └── brand/                     # Brand images and textures
├── config/                        # (Reserved for configuration files)
├── scripts/                       # (Reserved for utilities)
├── data/                          # Local SQLite database & artifacts
├── docs/                          # (Reserved for documentation)
├── package.json                   # Dependencies and scripts
├── tailwind.config.ts             # Tailwind CSS configuration
├── tsconfig.json                  # TypeScript configuration
├── next.config.mjs                # Next.js configuration
└── README.md                      # This file
```

---

## Dependencies

### Production
- **next** (^15.2.2) – React framework and server
- **react** (^19.0.0) – UI library
- **react-dom** (^19.0.0) – DOM rendering
- **better-sqlite3** (^9.4.5) – Fast, synchronous SQLite driver
- **lucide-react** (^0.563.0) – Icon library

### Development
- **typescript** (^5.4.5) – Type safety
- **tailwindcss** (^3.4.4) – Utility-first CSS framework
- **autoprefixer** (^10.4.19) – CSS vendor prefixes
- **postcss** (^8.4.38) – CSS preprocessing
- **@types/react**, **@types/react-dom**, **@types/node** – TypeScript definitions

---

## Next Steps

### Planned Features
- ✅ Template CRUD (Create, Read, Update, Delete) operations
- ✅ Upload preview and validation
- ✅ Bend-sheet export (PDF/CSV)
- ✅ Photo capture and QR marker scanning integration
- ✅ User authentication and project history
- ✅ Advanced material database
- ✅ Real-time collaboration

### Development Roadmap
1. Wire up template CRUD endpoints
2. Implement file upload preview
3. Add bend-sheet PDF export
4. Integrate camera capture API
5. Build user authentication layer
6. Create project history/archive
7. Add role-based access control

---

## Technology Stack Summary

| Layer | Technology |
|-------|-----------|
| **Frontend** | React 19 + TypeScript + Tailwind CSS |
| **Framework** | Next.js 15 (App Router) |
| **Database** | SQLite + better-sqlite3 |
| **Icons** | Lucide React |
| **Styling** | Tailwind CSS + CSS Grid + Flexbox |
| **Fonts** | Oxanium (headings), Barlow (body) |

---

## License

This project is part of the Rainmaker Media ecosystem. See repository for licensing details.

---

## Support & Questions

For issues, feature requests, or questions:
- Check existing GitHub issues
- Review the `AGENTS.md` file for project guidelines
- Contact the BendPro development team

---

**BendPro™ – Precision Fabrication, Streamlined. ✓**
