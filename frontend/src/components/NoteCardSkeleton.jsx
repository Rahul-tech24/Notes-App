import SkeletonBlock from "./SkeletonBlock";

export default function NoteCardSkeleton() {
  return (
    <div className="note-card p-5 sm:p-6">
      <div className="space-y-5">
        <div className="flex items-center justify-between gap-3">
          <SkeletonBlock className="h-8 w-28 rounded-full" />
          <SkeletonBlock className="h-10 w-24 rounded-full" />
        </div>

        <div className="space-y-3">
          <SkeletonBlock className="h-10 w-3/4" />
          <SkeletonBlock className="h-4 w-full" />
          <SkeletonBlock className="h-4 w-11/12" />
          <SkeletonBlock className="h-4 w-3/5" />
        </div>

        <div className="flex items-center justify-between gap-3 border-t border-[rgba(27,37,40,0.08)] pt-4">
          <SkeletonBlock className="h-3 w-36" />
          <SkeletonBlock className="h-4 w-20" />
        </div>
      </div>
    </div>
  );
}
