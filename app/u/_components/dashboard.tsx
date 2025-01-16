export function Dashboard() {
  return (
    <>
      <div className="p-2 flex flex-col gap-3 border rounded-md bg-white">
        <p className="font-bold text-md">Main Balance</p>
        <div className="flex gap-2 items-center">
          <p className="text-2xl font-bold text-blue-950">2.0543 SOL</p>
          <p className="bg-green-300 text-white p-1 rounded-full text-xs">
            $ 465
          </p>
        </div>
        <p>$1234 traded</p>
      </div>
      <div className="p-2 flex flex-col gap-3 border rounded-md bg-white">
        <div className="flex justify-between font-bold">
          <h2>Recent Transaction</h2>
          <button className="text-xs">VIEW ALL</button>
        </div>
        <div className="flex">
          <div className="flex-1 pr-2">
            <div className="flex justify-between items-center">
              <p className="font-bold text-sm text-blue-950">TX000245</p>
              <p className="font-bold text-sm text-blue-950">+3000</p>
            </div>
            <div className="flex justify-between items-center">
              <p className="text-xs text-slate-700">
                {new Date().toLocaleDateString()}
              </p>
              <p className="text-xs text-slate-700">0.00123 Sol</p>
            </div>
          </div>
          <div className="p-1 text-xl text-green-900 flex items-center justify-center">
            S
          </div>
        </div>
        <div className="flex">
          <div className="flex-1 pr-2">
            <div className="flex justify-between items-center">
              <p className="font-bold text-sm text-blue-950">TX000245</p>
              <p className="font-bold text-sm text-blue-950">+3000</p>
            </div>
            <div className="flex justify-between items-center">
              <p className="text-xs text-slate-700">
                {new Date().toLocaleDateString()}
              </p>
              <p className="text-xs text-slate-700">0.00123 Sol</p>
            </div>
          </div>
          <div className="p-1 text-xl text-green-900 flex items-center justify-center">
            S
          </div>
        </div>
        <div className="flex">
          <div className="flex-1 pr-2">
            <div className="flex justify-between items-center">
              <p className="font-bold text-sm text-blue-950">TX000245</p>
              <p className="font-bold text-sm text-blue-950">+3000</p>
            </div>
            <div className="flex justify-between items-center">
              <p className="text-xs text-slate-700">
                {new Date().toLocaleDateString()}
              </p>
              <p className="text-xs text-slate-700">0.00123 Sol</p>
            </div>
          </div>
          <div className="p-1 text-xl text-green-900 flex items-center justify-center">
            S
          </div>
        </div>
        <div className="flex">
          <div className="flex-1 pr-2">
            <div className="flex justify-between items-center">
              <p className="font-bold text-sm text-blue-950">TX000245</p>
              <p className="font-bold text-sm text-blue-950">+3000</p>
            </div>
            <div className="flex justify-between items-center">
              <p className="text-xs text-slate-700">
                {new Date().toLocaleDateString()}
              </p>
              <p className="text-xs text-slate-700">0.00123 Sol</p>
            </div>
          </div>
          <div className="p-1 text-xl text-green-900 flex items-center justify-center">
            S
          </div>
        </div>
        <div className="flex">
          <div className="flex-1 pr-2">
            <div className="flex justify-between items-center">
              <p className="font-bold text-sm text-blue-950">TX000245</p>
              <p className="font-bold text-sm text-blue-950">+3000</p>
            </div>
            <div className="flex justify-between items-center">
              <p className="text-xs text-slate-700">
                {new Date().toLocaleDateString()}
              </p>
              <p className="text-xs text-slate-700">0.00123 Sol</p>
            </div>
          </div>
          <div className="p-1 text-xl text-green-900 flex items-center justify-center">
            S
          </div>
        </div>
        <div className="flex">
          <div className="flex-1 pr-2">
            <div className="flex justify-between items-center">
              <p className="font-bold text-sm text-blue-950">TX000245</p>
              <p className="font-bold text-sm text-blue-950">+3000</p>
            </div>
            <div className="flex justify-between items-center">
              <p className="text-xs text-slate-700">
                {new Date().toLocaleDateString()}
              </p>
              <p className="text-xs text-slate-700">0.00123 Sol</p>
            </div>
          </div>
          <div className="p-1 text-xl text-green-900 flex items-center justify-center">
            S
          </div>
        </div>
      </div>
    </>
  );
}
