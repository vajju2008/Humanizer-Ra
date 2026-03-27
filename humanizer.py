import re
import random
from typing import Dict, List, Tuple

class CodeHumanizer:
    def __init__(self):
        self.generic_names = {
            'item': ['elem', 'node', 'entry', 'record', 'obj', 'current', 'target'],
            'result': ['outcome', 'processed', 'output', 'response', 'data', 'payload'],
            'temp': ['scratch', 'interim', 'holder', 'staging', 'buffer'],
            'val': ['value', 'magnitude', 'amount', 'content'],
            'arr': ['collection', 'sequence', 'list', 'items', 'elements'],
            'data': ['content', 'payload', 'info', 'state', 'source'],
            'func': ['operation', 'action', 'process', 'handler'],
            'i': ['idx', 'cursor', 'count'],
            'x': ['value', 'input', 'scalar', 'param'],
            'str': ['text', 'content', 'message', 'label']
        }
        
    def transform(self, code: str, language: str) -> str:
        """Main entry point for humanizing code"""
        processed = self._apply_contextual_naming(code, language)
        processed = self._vary_spacing(processed)
        processed = self._rewrite_comments(processed, language)
        processed = self._add_quirks(processed, language)
        
        return processed.strip()
    
    def _apply_contextual_naming(self, code: str, language: str) -> str:
        """Vary variable names based on context"""
        lines = code.split('\n')
        
        for i, line in enumerate(lines):
            # Analyze context and replace generic names
            if 'for i in' in line or 'for i,' in line:
                # Context: loop counter - could use idx, pos, count
                if language != 'python':
                    line = re.sub(r'\bi\b', random.choice(['idx', 'pos', 'index']), line)
            
            if 'item in' in line:
                alternatives = random.choice([
                    'elem', 'entry', 'record', 'obj'
                ])
                line = re.sub(r'\bitem\b', alternatives, line)
            
            if 'result =' in line or 'result:' in line:
                alternatives = random.choice([
                    'output', 'processed', 'outcome', 'transformed'
                ])
                line = re.sub(r'\bresult\b', alternatives, line)
            
            if ' val ' in line or ' val,' in line or ' val;' in line:
                alternatives = random.choice([
                    'value', 'magnitude', 'quantity'
                ])
                line = re.sub(r'\bval\b', alternatives, line)
            
            lines[i] = line
        
        return '\n'.join(lines)
    
    def _vary_spacing(self, code: str) -> str:
        """Adjust spacing to feel less formulaic"""
        lines = code.split('\n')
        result = []
        
        for line in lines:
            # Remove excessive spacing before operators in some places
            if '  ==' in line or '  =' in line:
                line = re.sub(r'\s+([=!<>])', r' \1', line)
            
            # Add breathing room for complex expressions occasionally
            if len(line.strip()) > 80:
                # Split long expressions more naturally
                pass
            
            result.append(line)
        
        return '\n'.join(result)
    
    def _rewrite_comments(self, code: str, language: str) -> str:
        """Make comments feel more natural and conversational"""
        lines = code.split('\n')
        comment_char = '#' if language in ['python', 'bash'] else '//'
        
        for i, line in enumerate(lines):
            if comment_char in line:
                # Extract and rewrite comment
                parts = line.split(comment_char, 1)
                if len(parts) == 2:
                    code_part = parts[0]
                    comment = parts[1].strip()
                    
                    # Make comment more conversational
                    comment = self._humanize_comment(comment)
                    lines[i] = f"{code_part}{comment_char} {comment}"
        
        return '\n'.join(lines)
    
    def _humanize_comment(self, comment: str) -> str:
        """Transform robotic comments into conversational ones"""
        comment = comment.lower()
        
        # Common AI patterns to replace
        replacements = {
            r'initialize.*array': 'set up the collection',
            r'loop through': 'iterate over',
            r'check if.*equals': 'verify it matches',
            r'set.*to.*zero': 'reset to zero',
            r'function to.*': 'handles ',
            r'this function': 'handles',
            r'return the result': 'pass back the result',
            r'error handling': 'catch edge cases',
            r'check.*condition': 'validate the condition',
        }
        
        for pattern, replacement in replacements.items():
            comment = re.sub(pattern, replacement, comment, flags=re.IGNORECASE)
        
        return comment.strip()
    
    def _add_quirks(self, code: str, language: str) -> str:
        """Add subtle human touches"""
        lines = code.split('\n')
        
        # Occasionally break symmetry in formatting
        for i in range(len(lines)):
            line = lines[i]
            
            # Remove redundant blank lines sometimes
            if i > 0 and lines[i-1].strip() == '' and line.strip() == '':
                if random.random() > 0.5:
                    lines[i] = ''
            
            # Adjust indentation style occasionally (4 vs 2 spaces for readability)
            if line.startswith('        '):
                if random.random() > 0.7:
                    lines[i] = '    ' + line[8:]
        
        # Remove the blank line quirk if it creates issues
        lines = [l for l in lines if l.strip() or len([x for x in lines if x.strip()]) > len([x for x in lines])]
        
        return '\n'.join(lines)
