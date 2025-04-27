// Breakdown of trip expenses and final split

const expenses = [
  { amount: 230, paidFor: 'Train Ticket 🚆' },
  { amount: 300, paidFor: 'Auto 🚗' },
  { amount: 300, paidFor: 'Petrol ⛽' },
  { amount: 10, paidFor: 'Bike hawa 🏍️' },
  { amount: 50, paidFor: 'Pohe 🍽️' },
  { amount: 20, paidFor: 'Tea ☕' },
  { amount: 20, paidFor: 'Water Bottle 🥤' },
  { amount: 10, paidFor: 'Laddu 🍬' },
  { amount: 10, paidFor: 'Tea ☕' },
  { amount: 40, paidFor: 'Lemon Sharbat 🍋' },
  { amount: 30, paidFor: 'Drinks (Thumbs Up ₹20 for Satish + Chaas ₹10 for me) 🥤' },
  { amount: 15, paidFor: 'Vada Pav 🍔' },
  { amount: 40, paidFor: 'Sugarcane Juice 🍹' },
  { amount: 20, paidFor: 'Cucumber 🥒' },
  { amount: 50, paidFor: 'Coconut Water 🥥' },
  { amount: 90, paidFor: 'Food (Dalcha Rice ₹60 + Bhaji ₹30) 🍛' },
  { amount: 40, paidFor: 'Irani Tea (Aundh) 🍵' },
  { amount: 60, paidFor: 'Cash payment 💵' }
];

// Total amount spent by me
const totalSpent = expenses.reduce((total, expense) => total + expense.amount, 0); // ₹1335

// Decisions for splitting
const personalExpenses = [
  { amount: 20, paidFor: 'Thumbs Up 🍻 (Satish\'s Personal)' },
  { amount: 10, paidFor: 'Chaas 🥛 (My Personal)' }
];

const personalTotal = personalExpenses.reduce((total, expense) => total + expense.amount, 0); // ₹30

const sharedTotal = totalSpent - personalTotal; // ₹1305
const eachShare = sharedTotal / 2; // ₹652.5

// Final calculations for each person's share
const finalAmounts = {
  satish: eachShare + 10, // ₹662.5 (Chaas 🥛 for Satish)
  me: eachShare + 20 // ₹672.5 (Thumbs Up 🍻 for me)
};

// Output to share with Satish
const message = `
Hey Satish,

Here’s the detailed breakdown of our Tung Fort trip expenses and how we decided to split everything:

Expenses Paid by Me:
${expenses.map(expense => `- ₹${expense.amount} for ${expense.paidFor}`).join('\n')}

Total Spent: ₹${totalSpent} 💰

Decisions:
- All payments were done by me (online + ₹60 cash).
- We agreed to split the costs equally after the trip.
- Personal items:
  - Thumbs Up (₹20) → Your personal.
  - Chaas (₹10) → My personal.

Personal Expenses (Not Shared):
${personalExpenses.map(expense => `- ₹${expense.amount} for ${expense.paidFor}`).join('\n')}

Personal Total: ₹${personalTotal}

Amount to Split: ₹${sharedTotal}
Each person’s share: ₹${eachShare} 🤝

Final Calculation:
- Your final share = ₹${finalAmounts.satish} 💸
- My final share = ₹${finalAmounts.me} 💸

You can send ₹${finalAmounts.satish} whenever you’re ready. No rush! ⏳

Let me know if you need any clarifications or further details.

Thanks! 🙏
`;

// Send message
console.log(message);