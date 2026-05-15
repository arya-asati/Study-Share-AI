type Props = {
  title: string;
  value: string;
};

export default function StatsCard({ title, value }: Props) {
  return (
    <div className="bg-white/5 border border-white/10 rounded-3xl p-6 backdrop-blur-lg shadow-xl">

      <h2 className="text-zinc-400 text-lg">
        {title}
      </h2>

      <h1 className="text-4xl font-black mt-3 text-cyan-400">
        {value}
      </h1>

    </div>
  );
}