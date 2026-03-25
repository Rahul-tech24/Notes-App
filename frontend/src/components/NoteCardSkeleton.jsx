// frontend/components/NoteCardSkeleton.jsx
import SkeletonBlock from "./SkeletonBlock";

export default function NoteCardSkeleton() {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm dark:border-gray-800 dark:bg-gray-900">
      <div className="space-y-4">
        <SkeletonBlock className="h-5 w-2/3" />
        <SkeletonBlock className="h-4 w-full" />
        <SkeletonBlock className="h-4 w-5/6" />

        <div className="flex items-center justify-between pt-2">
          <SkeletonBlock className="h-3 w-24" />
          <div className="flex gap-2">
            <SkeletonBlock className="h-8 w-16 rounded-full" />
            <SkeletonBlock className="h-8 w-16 rounded-full" />
          </div>
        </div>
      </div>
    </div>
  );
}