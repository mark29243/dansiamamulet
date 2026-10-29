const fs = require('fs');
const { parse } = require('csv-parse/sync');
const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://vipqvizivfzkjdqeuyhu.supabase.co';
const supabaseServiceKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZpcHF2aXppdmZ6a2pkcWV1eWh1Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc5MTQ2NzEwMSwiZXhwIjoyMTA3MDQzMTAxfQ.o9d6axLEXcs5CwEeHLGQN32N6Dsp0I7W9bcWYCu8X-0';

const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function run() {
  const filePath = 'C:\\Users\\mark2\\Downloads\\accounting_records_rows.csv';
  if (!fs.existsSync(filePath)) {
    console.error('File not found:', filePath);
    return;
  }

  const fileContent = fs.readFileSync(filePath, 'utf8');
  const records = parse(fileContent, {
    columns: true,
    skip_empty_lines: true,
    trim: true,
  });

  console.log(`Parsed ${records.length} records from CSV.`);

  const formatted = records.map(r => ({
    id: r.id,
    created_at: r.created_at || new Date().toISOString(),
    date: r.date,
    type: r.type,
    category: r.category || null,
    product_name: r.product_name || null,
    amount: parseFloat(r.amount) || 0,
    cost: parseFloat(r.cost) || 0,
    description: r.description || null,
    image_url: r.image_url || null,
    order_id: r.order_id || null,
    fee: parseFloat(r.fee) || 0,
    shipping: parseFloat(r.shipping) || 0,
  }));

  const { data, error } = await supabase.from('accounting_records').upsert(formatted);
  if (error) {
    console.error('Import error:', error);
  } else {
    console.log('Successfully imported all accounting records!');
  }
}

run();
