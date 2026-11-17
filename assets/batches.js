/* Happiness Program batches — edit ONLY this list; the home and Happiness pages read from it.
   Leave the list empty and both pages honestly say "next batch announced soon".

   Example entry (remove the // to use):
   { date:'Fri 14 – Sun 16 Nov 2026', time:'6:30–9:30 pm IST', mode:'Online', language:'English',
     seats:'20', fee:'₹TBD', registerUrl:'' }

   fee: the amount, or leave '' to show "Fee shared on WhatsApp".
   registerUrl: optional direct link (e.g. the Art of Living course page); '' = register via WhatsApp.
   seats: optional.
   end: last day as 'YYYY-MM-DD'. A batch disappears from both pages the day after it ends,
        so a past date is never advertised. Leave the list empty for "announced soon".
*/
var AS_BATCHES = [
  { date:'Thu 22 – Sun 25 Oct 2026', time:'Evening · 6:00–8:30 PM IST', mode:'Online (Zoom)', language:'',
    seats:'', fee:'By donation to the Art of Living Foundation', registerUrl:'https://aolt.in/1061195',
    end:'2026-10-25' }
];

/* Drop batches that have already ended (runs before the pages render). */
AS_BATCHES = AS_BATCHES.filter(function (b) {
  if (!b.end) return true;
  var d = new Date(b.end + 'T23:59:59+05:30');
  return isNaN(d) || d.getTime() >= Date.now();
});
