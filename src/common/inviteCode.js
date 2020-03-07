export function getInvitedCode() {
  var jschars = ['0', '3', 'L', 'M', 'N', 'A', '2', 'B', 'C', 'D', '1', 'E', 'F', 'G',
    'H', '4', 'I', 'J', 'K', '9', 'O', 'P', 'Q', '5', 'R', 'S', 'T', '6',
    '7', 'U', 'V', '8', 'W', 'X', 'Y', 'Z'
  ];
  var inivteCodes = "";
  for (var i = 0; i < 8; i++) {
    var id = Math.ceil(Math.random() * 35);
    inivteCodes += jschars[id];
  }
  return inivteCodes
}