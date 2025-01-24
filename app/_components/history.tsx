import ActivityItem from "./UI/activity-item";

export default function History(){
    

    return (
      <div className="max-w-md mx-auto flex-1 w-full p-4">
        <h1 className="text-xl font-semibold mb-4">Activity</h1>
        <div className="space-y-4">
          <div>
            <div className="text-gray-400 text-xs mb-2">Today</div>
            <ActivityItem
              icon="https://placehold.co/32x32"
              title="Swapped"
              subtitle="USDC → ETH"
              amount="+<0.001 ETH"
              amountColor="text-green-500"
              details="-<0.01 SOL"
            />
          </div>
          <div>
            <div className="text-gray-400 text-xs mb-2">16 January</div>
            <ActivityItem
              icon="https://placehold.co/32x32"
              title="Received"
              subtitle="From: 3PNb...7FWK"
              amount="+71,288 KIN"
              amountColor="text-green-500"
            />
            <ActivityItem
              icon="https://placehold.co/32x32"
              title="Created token account"
              subtitle="KIN (KIN)"
              amount="-<0.01 SOL"
              amountColor="text-gray-400"
            />
          </div>
          <div>
            <div className="text-gray-400 text-xs mb-2">13 January</div>
            <ActivityItem
              icon="https://placehold.co/32x32"
              title="Received NFT"
              subtitle='"Alpha Vault #3"'
              amount="+1 Alpha Vault #3"
              amountColor="text-green-500"
            />
          </div>
        </div>
      </div>
    );
}