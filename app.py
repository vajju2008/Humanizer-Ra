from flask import Flask, request, jsonify
from flask_cors import CORS
from humanizer import CodeHumanizer
import os

app = Flask(__name__)
CORS(app)

humanizer = CodeHumanizer()

@app.route('/api/humanize', methods=['POST'])
def humanize_code():
    try:
        data = request.get_json()
        code = data.get('code', '').strip()
        language = data.get('language', 'python')
        
        if not code:
            return jsonify({'error': 'No code provided'}), 400
        
        humanized = humanizer.transform(code, language)
        
        return jsonify({
            'success': True,
            'humanized_code': humanized
        })
    
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/health', methods=['GET'])
def health():
    return jsonify({'status': 'ok'})

if __name__ == '__main__':
    app.run(debug=True, port=5000, host='0.0.0.0')
