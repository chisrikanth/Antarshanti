// Test helpers: a valid slot (next Monday 09:00 India time, at least 3 days away) and a fake database.
exports.nextMondayNineIst = function () {
  const d = new Date(Date.now() + 3 * 86400000);
  while (new Date(d.getTime() + 330 * 60000).getUTCDay() !== 1) d.setUTCDate(d.getUTCDate() + 1);
  const ist = new Date(d.getTime() + 330 * 60000);
  const p = (n) => String(n).padStart(2, '0');
  return `${ist.getUTCFullYear()}-${p(ist.getUTCMonth() + 1)}-${p(ist.getUTCDate())}T09:00:00+05:30`;
};
exports.RULES = [[1,'09:00:00'],[1,'10:00:00'],[1,'11:00:00'],[3,'09:00:00']].map(([weekday, start_time]) => ({ weekday, start_time }));
