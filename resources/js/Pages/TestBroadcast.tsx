import { useEffect } from 'react';

export default function TestBroadcast() {
  useEffect(() => {
    const channel = window.Echo.channel('test-channel');
    channel.listen('.SomethingHappened', (e: any) => {
      console.log('📡 Event received in React:', e);
    });

    return () => {
      channel.stopListening('.SomethingHappened');
    };
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold">Listening for SomethingHappened</h1>
    </div>
  );
}