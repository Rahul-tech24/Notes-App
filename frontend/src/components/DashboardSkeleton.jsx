// frontend/components/DashboardSkeleton.jsx
import SkeletonBlock from "./SkeletonBlock";
import NoteCardSkeleton from "./NoteCardSkeleton";

export default function DashboardSkeleton() {
  return (
    <>
      <div className="max-w-3xl mx-auto p-10">
        <div className="space-y-6">
          <SkeletonBlock className="h-10 w-40" />
          <SkeletonBlock className="h-12 w-full" />
          <SkeletonBlock className="h-10 w-full" />

          <div className="space-y-4">
            {Array.from({ length: 5 }).map((_, index) => (
              <NoteCardSkeleton key={index} />
            ))}
          </div>

          <div className="flex items-center justify-between pt-4">
            <SkeletonBlock className="h-10 w-24" />
            <SkeletonBlock className="h-10 w-24" />
          </div>
        </div>
      </div>
    </>
  );
}