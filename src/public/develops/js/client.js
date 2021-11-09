import ReconnectingWebSocket from 'reconnecting-websocket';
import sharedb from 'sharedb/lib/client';
import richText from 'rich-text';
import Quill from 'quill';

// sharedb 타입 등록
sharedb.types.register(richText.type);

// Open WebSocket connection to ShareDB server
const socket = new ReconnectingWebSocket('ws://' + window.location.host);
const connection = new sharedb.Connection(socket);

// For testing reconnection
window.disconnect = function() {
  connection.close();
};
window.connect = function() {
  const socket = new ReconnectingWebSocket('ws://' + window.location.host);
  connection.bindToSocket(socket);
};

// Create local Doc instance mapped to 'examples' collection document with id 'richtext'
const doc = connection.get('examples', 'richtext');
doc.subscribe(function(err) {
  if (err) throw err;
  const quill = new Quill('#editor', {theme: 'snow'});
  quill.setContents(doc.data);
  quill.on('text-change', function(delta, oldDelta, source) {
    if (source !== 'user') return;
    doc.submitOp(delta, {source: quill});
  });
  doc.on('op', function(op, source) {
    if (source === quill) return;
    quill.updateContents(op);
  });
});
