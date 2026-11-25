// tiny-bot: a dip-scalper that beats buy-and-hold on Solana hourly bars
// (agent-fun/bars-replay/v1). The strategy lives in strategy.ts; the SDK shim
// is the kit's sdk/makefun-bars.ts, vendored byte for byte.
//
// Rules, in one breath: buy a symbol when MACD(12,26,9) is above its signal
// line (trend up) and CCI(14) is at or under -20 (dipped below its recent
// range); sell the whole position the hour MACD drops under its signal line,
// or at +8% take-profit, or at -10% stop-loss. Stake is equity/7 per entry,
// capped at 25% of equity per symbol. Sits in cash when nothing qualifies.
//
// Dev window (136 hourly bars, 29 Oct – 3 Nov 2026): offline mirror
// +270.7 USDC on $10,000, worst 72-bar slice +54.0 USDC, 40 trades,
// max drawdown -1.9%. House buy-and-hold on the same window: -869.3 USDC.
// grade-local (kit, process driver): net PnL +210.55 USDC (+2.11%),
// 40 trades, win rate 52.2%, max drawdown 2.22%, guardrails met,
// 0 rejected, reproduced byte for byte. Beats buy-and-hold by +1,079.9 USDC
// and the best house bot (macd-cci, -20.2 USDC) by +230.8 USDC.

import { runBars } from './vendor/makefun-bars.ts';
import { createStrategy, DEFAULT_PARAMS } from './strategy.ts';

await runBars(createStrategy(DEFAULT_PARAMS));
