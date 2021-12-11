export default text => `${text}`.toLowerCase().replace(/[^a-z0-9]/g, '-').replace(/-{2,}/g, '-').replace(/^-|-$/g, '');
