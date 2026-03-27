'use client'

import { useState } from 'react'
import axios from 'axios'

export default function Home() {
  const [inputCode, setInputCode] = useState('')
  const [outputCode, setOutputCode] = useState('')
  const [language, setLanguage] = useState('python')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [copied, setCopied] = useState(false)

  const handleHumanize = async () => {
    if (!inputCode.trim()) {
      setError('Please paste some code first')
      return
    }

    setLoading(true)
    setError('')
    setCopied(false)

    try {
      const response = await axios.post('http://localhost:5000/api/humanize', {
        code: inputCode,
        language: language
      })

      setOutputCode(response.data.humanized_code)
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to humanize code. Make sure the backend is running on port 5000.')
    } finally {
      setLoading(false)
    }
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(outputCode)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleClear = () => {
    setInputCode('')
    setOutputCode('')
    setError('')
  }

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h1 style={styles.heading}>🧠 Code Humanizer</h1>
        <p style={styles.subtitle}>Transform AI-generated code into genuinely human-authored style</p>
      </div>

      <div style={styles.content}>
        <div style={styles.panel}>
          <h2 style={styles.panelTitle}>AI-Generated Code</h2>
          
          <select 
            value={language} 
            onChange={(e) => setLanguage(e.target.value)}
            disabled={loading}
            style={styles.select}
          >
            <option value="python">Python</option>
            <option value="javascript">JavaScript</option>
            <option value="typescript">TypeScript</option>
            <option value="java">Java</option>
            <option value="cpp">C++</option>
            <option value="csharp">C#</option>
            <option value="go">Go</option>
            <option value="rust">Rust</option>
            <option value="sql">SQL</option>
          </select>

          <textarea
            value={inputCode}
            onChange={(e) => setInputCode(e.target.value)}
            placeholder="Paste your AI-generated code here..."
            disabled={loading}
            style={styles.textarea}
          />

          <div style={styles.controls}>
            <button 
              style={{...styles.button, ...styles.buttonPrimary}}
              onClick={handleHumanize}
              disabled={loading || !inputCode.trim()}
            >
              {loading ? '🔄 Processing...' : '✨ Humanize'}
            </button>
            <button 
              style={{...styles.button, ...styles.buttonSecondary}}
              onClick={handleClear}
              disabled={loading}
            >
              Clear
            </button>
          </div>
        </div>

        <div style={styles.panel}>
          <h2 style={styles.panelTitle}>Humanized Code</h2>
          
          <div style={styles.outputContainer}>
            {error && <div style={styles.error}>{error}</div>}
            
            {loading && (
              <div style={styles.loading}>
                <div style={styles.spinner}></div>
                Humanizing your code...
              </div>
            )}

            {!loading && outputCode && (
              <>
                <button 
                  style={styles.copyBtn}
                  onClick={handleCopy}
                >
                  {copied ? '✓ Copied!' : '📋 Copy'}
                </button>
                <pre style={styles.outputCode}>{outputCode}</pre>
              </>
            )}

            {!loading && !outputCode && !error && (
              <div style={{color: '#999', textAlign: 'center', marginTop: '60px'}}>
                Your humanized code will appear here
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

const styles = {
  container: {
    width: '100%',
    maxWidth: '1400px',
    background: 'white',
    borderRadius: '12px',
    boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)',
    overflow: 'hidden',
    margin: '0 auto',
    minHeight: '100vh'
  },
  header: {
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    color: 'white',
    padding: '40px 30px',
    textAlign: 'center'
  },
  heading: {
    fontSize: '2.5em',
    marginBottom: '10px',
    fontWeight: '700'
  },
  subtitle: {
    fontSize: '1.1em',
    opacity: '0.9'
  },
  content: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '20px',
    padding: '30px',
    minHeight: '500px'
  },
  panel: {
    display: 'flex',
    flexDirection: 'column',
    gap: '15px'
  },
  panelTitle: {
    fontSize: '1.3em',
    fontWeight: '600',
    color: '#333',
    borderBottom: '2px solid #667eea',
    paddingBottom: '10px'
  },
  textarea: {
    flex: 1,
    padding: '15px',
    border: '1px solid #ddd',
    borderRadius: '8px',
    fontFamily: "'Courier New', monospace",
    fontSize: '14px',
    resize: 'none',
    background: '#f9f9f9',
    color: '#333'
  },
  select: {
    padding: '10px',
    border: '1px solid #ddd',
    borderRadius: '6px',
    fontSize: '14px',
    background: 'white',
    cursor: 'pointer'
  },
  controls: {
    display: 'flex',
    gap: '10px',
    flexWrap: 'wrap'
  },
  button: {
    flex: 1,
    padding: '12px 24px',
    border: 'none',
    borderRadius: '6px',
    fontSize: '16px',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.3s ease'
  },
  buttonPrimary: {
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    color: 'white'
  },
  buttonSecondary: {
    background: '#f0f0f0',
    color: '#333',
    border: '1px solid #ddd'
  },
  outputContainer: {
    position: 'relative',
    flex: 1,
    background: '#f9f9f9',
    border: '1px solid #ddd',
    borderRadius: '8px',
    overflow: 'auto',
    padding: '15px'
  },
  outputCode: {
    fontFamily: "'Courier New', monospace",
    fontSize: '14px',
    whiteSpace: 'pre-wrap',
    wordBreak: 'break-word',
    color: '#333',
    lineHeight: '1.5'
  },
  loading: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
    color: '#999',
    fontSize: '1.1em'
  },
  spinner: {
    border: '4px solid #f0f0f0',
    borderTop: '4px solid #667eea',
    borderRadius: '50%',
    width: '40px',
    height: '40px',
    animation: 'spin 1s linear infinite',
    marginRight: '15px'
  },
  error: {
    background: '#fee',
    color: '#c33',
    padding: '15px',
    borderRadius: '6px',
    border: '1px solid #fcc',
    marginBottom: '15px'
  },
  copyBtn: {
    position: 'absolute',
    top: '10px',
    right: '10px',
    padding: '8px 12px',
    background: '#667eea',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '12px'
  }
}
