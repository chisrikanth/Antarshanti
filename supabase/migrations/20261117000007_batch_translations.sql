-- Optional Telugu/Hindi text for a batch, e.g. {"te":{"time":"...","mode":"...","fee":"...","language":"..."},"hi":{...}}
-- If empty, the English text is shown. Dates are formatted automatically from starts_on / ends_on.
alter table batches add column if not exists translations jsonb;
