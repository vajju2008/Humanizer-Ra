# Code Humanizer – Transform AI-Generated Code

A web platform that transforms AI-generated code to look genuinely human-authored while preserving all functionality. Upload any code snippet, and it'll be rewritten with natural variable names, conversational comments, organic structure, and authentic developer quirks.

## Features

✨ **AI-to-Human Transformation**
- Contextual variable naming (replaces generic names with natural alternatives)
- Humanized comments (converts robotic docstrings to conversational notes)
- Organic code structure (breaks symmetry and formulaic patterns)
- Developer quirks (adds subtle human touches and style variations)

🌐 **Multi-Language Support**
- Python, JavaScript, TypeScript, Java, C++, C#, Go, Rust, SQL

🎨 **Beautiful Web UI**
- Side-by-side input/output comparison
- Real-time processing with loading states
- Copy-to-clipboard functionality
- Responsive design

## Setup & Installation

### Backend (Python Flask)

```bash
cd "c:\Antigravity\Humanize ai aa"
python -m venv venv
venv\Scripts\activate
pip install -r requirements.txt
python app.py
```

The backend will start on `http://localhost:5000`

### Frontend (Next.js)

```bash
# Install dependencies
npm install

# Run development server
npm run dev
```

The frontend will start on `http://localhost:3000`

## Usage

1. Open `http://localhost:3000` in your browser
2. Paste AI-generated code into the left panel
3. Select the programming language
4. Click "✨ Humanize"
5. Copy the humanized code from the right panel

## How It Works

The humanizer applies several transformations:

### 1. Contextual Naming
Replaces generic variable names with context-aware alternatives:
- `item` → `elem`, `entry`, `record`, `obj`
- `result` → `outcome`, `processed`, `output`, `response`
- `temp` → `scratch`, `interim`, `holder`, `buffer`
- `i` → `idx`, `pos`, `count` (context-dependent)

### 2. Comment Rewriting
Converts robotic AI comments to natural language:
- "Initialize array" → "set up the collection"
- "Loop through items" → "iterate over items"
- "Check if equals" → "verify it matches"

### 3. Structure Variation
- Breaks symmetric formatting patterns
- Adjusts spacing naturally
- Removes formulaic indentation
- Preserves readability

### 4. Developer Quirks
- Subtle spacing variations
- Context-aware code organization
- Natural line breaks
- Individual style touches

## API Reference

### POST `/api/humanize`

Request:
```json
{
  "code": "def calculate(x, y):\n    result = x + y\n    return result",
  "language": "python"
}
```

Response:
```json
{
  "success": true,
  "humanized_code": "def calculate(a, b):\n    output = a + b\n    return output"
}
```

### GET `/api/health`

Check if backend is running:
```json
{
  "status": "ok"
}
```

## Project Structure

```
.
├── app.py                 # Flask backend server
├── humanizer.py          # Core humanization engine
├── requirements.txt       # Python dependencies
├── package.json          # Node.js dependencies
├── next.config.js        # Next.js configuration
├── page.js               # Frontend React component
└── README.md             # This file
```

## Configuration

### Environment Variables

Create a `.env` file if you need custom settings:

```env
FLASK_ENV=development
FLASK_DEBUG=True
CORS_ORIGINS=http://localhost:3000
```

## Technologies Used

**Backend:**
- Flask – Lightweight Python web framework
- Flask-CORS – Handle cross-origin requests
- Python 3.8+ – Core language

**Frontend:**
- Next.js 14 – React framework
- React 18 – UI library
- Axios – HTTP client
- Highlight.js – Syntax highlighting

## Future Enhancements

- [ ] Advanced AST-based transformations
- [ ] Language-specific optimization
- [ ] Before/after diff view
- [ ] Code quality metrics
- [ ] User accounts & history
- [ ] Batch processing
- [ ] API rate limiting
- [ ] Advanced language detection

## License

MIT

## Support

For issues or questions, check the logs:

**Backend:**
```bash
# Check Flask logs in terminal
```

**Frontend:**
```bash
# Check browser console (F12)
```

Ensure both services are running on their respective ports (3000 for frontend, 5000 for backend).
