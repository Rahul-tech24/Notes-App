import SkeletonBlock from "./SkeletonBlock";
import NoteCardSkeleton from "./NoteCardSkeleton";

export default function DashboardSkeleton() {
  return (
    <div className="px-4 pb-10 pt-6 sm:px-6">
      <div className="app-frame space-y-6">
        <section className="surface-card p-6 sm:p-7">
          <div className="space-y-4">
            <SkeletonBlock className="h-4 w-24" />
            <SkeletonBlock className="h-12 w-1/2" />
            <SkeletonBlock className="h-4 w-2/5" />
            <SkeletonBlock className="h-12 w-full rounded-[24px]" />
          </div>
        </section>

        <div className="grid gap-4 md:grid-cols-2">
          {Array.from({ length: 4 }).map((_, index) => (
            <NoteCardSkeleton key={index} />
          ))}
        </div>
      </div>
    </div>
  );
}
