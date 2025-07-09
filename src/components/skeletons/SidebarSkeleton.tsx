import type { FC } from "react"
import { FaUser } from "react-icons/fa6"

const SidebarSkeleton: FC = () => {
    const skeletonContcts: null[] = Array(8).fill(null)
    return (
        <aside className="w-20 lg:w-72 h-full border-r border-base-200 flex flex-col  transition-all duration-200">
            <div className="border-b border-base-300 w-full p-6">
                <div className="flex items-center gap-2">
                    <FaUser className="w-6 h-6" />
                    <span className="hidden lg:block font-medium">Contacts</span>
                </div>
            </div>
            {/* users skeletons */}
            <div className="w-full py-3  overflow-y-auto overflow-x-hidden">
                {skeletonContcts.map((_, idx) => (
                    <div key={idx} className="w-full p-3 flex items-center gap-3 lg:ml-2">
                        <div className="relative mx-auto lg:mx-0 ">
                            <div className="skeleton size-12 rounded-full" />
                        </div>
                        <div className="hidden lg:block text-left min-w-0 flex-1">
                            <div className="skeleton h-5 w-32 mb-2" />
                            <div className="skeleton h-3 w-16" />
                        </div>
                    </div>
                ))}
            </div>

        </aside>
    )
}

export default SidebarSkeleton