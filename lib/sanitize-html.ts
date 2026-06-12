// Defence-in-depth sanitizer for admin-authored blog HTML.
// Strips active content (scripts, event handlers, javascript: URLs) while
// leaving normal formatting tags untouched.
export function sanitizeHtml(html: string | null | undefined): string | null {
  if (!html) return html ?? null;
  return html
    // <script>...</script> including content
    .replace(/<script\b[^>]*>[\s\S]*?<\/script\s*>/gi, '')
    // dangling/self-closing script, and iframe/object/embed/form blocks
    .replace(/<\/?(?:script|iframe|object|embed|form)\b[^>]*>/gi, '')
    // inline event handlers: onclick="..." / onload='...' / onerror=foo
    .replace(/\son\w+\s*=\s*(?:"[^"]*"|'[^']*'|[^\s>]+)/gi, '')
    // javascript: in href/src/action
    .replace(/(\b(?:href|src|action)\s*=\s*)(["']?)\s*javascript:[^"'>\s]*/gi, '$1$2#');
}
