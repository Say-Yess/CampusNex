// src/components/ui/Leaderboard.js
import React from 'react';

const LeaderboardCard = ({
    rank,
    name,
    avatarUrl,
    department,
    count,
    unit = "Attended",
    className = "",
    highlight = false
}) => {
    // Determine highlight styles based on rank
    let bgColor = "bg-white";
    let badgeColor = "bg-gray-100";
    let textColor = "text-gray-600";

    if (highlight) {
        if (rank === 1) {
            bgColor = "bg-gradient-to-r from-yellow-50 to-yellow-100";
            badgeColor = "bg-yellow-100";
            textColor = "text-yellow-700";
        } else if (rank === 2) {
            bgColor = "bg-gradient-to-r from-gray-50 to-gray-100";
            badgeColor = "bg-gray-200";
            textColor = "text-gray-700";
        } else if (rank === 3) {
            bgColor = "bg-gradient-to-r from-amber-50 to-amber-100";
            badgeColor = "bg-amber-100";
            textColor = "text-amber-700";
        }
    }

    return (
        <div className={`${bgColor} ${className} transition-all duration-300 hover:shadow-lg hover:scale-102 rounded-xl overflow-hidden border border-neutral-200 shadow-sm`}>
            <div className="flex items-center p-3 md:p-4">
                <div className="flex-shrink-0 mr-3 md:mr-4 w-8 h-8 md:w-10 md:h-10 rounded-full bg-primary text-white flex items-center justify-center font-bold text-sm md:text-base">
                    {rank}
                </div>

                <div className="flex-shrink-0 mr-3 md:mr-4">
                    {avatarUrl ? (
                        <img
                            src={avatarUrl}
                            alt={name}
                            className="w-10 h-10 md:w-12 md:h-12 rounded-full object-cover border-2 border-gray-200"
                        />
                    ) : (
                        <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-gray-200 flex items-center justify-center text-gray-500 font-bold text-lg md:text-xl">
                            {name?.charAt(0) || '?'}
                        </div>
                    )}
                </div>

                <div className="flex-grow min-w-0">
                    <h3 className="font-bold text-base md:text-lg truncate">{name}</h3>
                    <p className="text-xs md:text-sm text-gray-500 truncate">{department}</p>
                </div>

                <div className="ml-auto flex-shrink-0">
                    <div className={`${badgeColor} ${textColor} px-2 py-1 md:px-3 md:py-1 text-xs md:text-sm font-medium rounded-full`}>
                        {count} {unit}
                    </div>
                </div>
            </div>
        </div>
    );
};

const TopThreeDisplay = ({ leaders = [], className = "" }) => {
    // Get top 3 if they exist
    const top3 = leaders.slice(0, 3);

    // If we don't have enough people, add placeholders
    while (top3.length < 3) {
        top3.push({ name: "Position Available", department: "Join events to rank", count: 0 });
    }

    // Reorder for display (1st in middle, 2nd on right, 3rd on left)
    const [second, first, third] = [top3[1], top3[0], top3[2]];

    return (
        <div className={`flex flex-col items-center ${className}`}>
            <div className="flex flex-wrap justify-center items-end gap-4 md:gap-8">
                {/* 2nd Place */}
                <div className="flex flex-col items-center order-1 md:order-1 mt-8 md:mt-16">
                    <div className="relative mb-4">
                        <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 text-4xl">🥈</div>
                        {second.profileImage || second.avatarUrl ? (
                            <img
                                src={second.profileImage || second.avatarUrl}
                                alt={second.name}
                                className="w-24 h-24 md:w-28 md:h-28 rounded-full object-cover border-4 border-gray-300 shadow-lg"
                            />
                        ) : (
                            <div className="w-24 h-24 md:w-28 md:h-28 rounded-full bg-gray-200 flex items-center justify-center text-gray-500 font-bold text-3xl border-4 border-gray-300 shadow-lg">
                                {second.name?.charAt(0) || '?'}
                            </div>
                        )}
                    </div>
                    <div className="w-full max-w-[250px] bg-gradient-to-b from-gray-200 to-gray-100 rounded-lg p-4 text-center shadow-md">
                        <h3 className="font-bold text-lg truncate">{second.name}</h3>
                        <p className="text-gray-600 text-sm">{second.department}</p>
                        <div className="mt-2 bg-gray-300 text-gray-700 px-3 py-1 text-sm font-medium rounded-full inline-block">
                            {second.totalEvents || second.count} Events
                        </div>
                    </div>
                </div>

                {/* 1st Place */}
                <div className="flex flex-col items-center order-0 md:order-0 scale-110 z-10">
                    <div className="relative mb-4">
                        <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 text-5xl">👑</div>
                        {first.profileImage || first.avatarUrl ? (
                            <img
                                src={first.profileImage || first.avatarUrl}
                                alt={first.name}
                                className="w-28 h-28 md:w-32 md:h-32 rounded-full object-cover border-4 border-yellow-400 shadow-lg"
                            />
                        ) : (
                            <div className="w-28 h-28 md:w-32 md:h-32 rounded-full bg-yellow-100 flex items-center justify-center text-yellow-800 font-bold text-4xl border-4 border-yellow-400 shadow-lg">
                                {first.name?.charAt(0) || '?'}
                            </div>
                        )}
                    </div>
                    <div className="w-full max-w-[280px] bg-gradient-to-b from-yellow-300 to-yellow-100 rounded-lg p-5 text-center shadow-lg">
                        <h3 className="font-bold text-xl truncate">{first.name}</h3>
                        <p className="text-yellow-800 text-sm">{first.department}</p>
                        <div className="mt-2 bg-yellow-200 text-yellow-800 px-3 py-1 text-sm font-medium rounded-full inline-block">
                            {first.totalEvents || first.count} Events
                        </div>
                    </div>
                </div>

                {/* 3rd Place */}
                <div className="flex flex-col items-center order-2 md:order-2 mt-8 md:mt-24">
                    <div className="relative mb-4">
                        <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 text-4xl">🥉</div>
                        {third.profileImage || third.avatarUrl ? (
                            <img
                                src={third.profileImage || third.avatarUrl}
                                alt={third.name}
                                className="w-20 h-20 md:w-24 md:h-24 rounded-full object-cover border-4 border-amber-600 shadow-lg"
                            />
                        ) : (
                            <div className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-amber-100 flex items-center justify-center text-amber-800 font-bold text-2xl border-4 border-amber-600 shadow-lg">
                                {third.name?.charAt(0) || '?'}
                            </div>
                        )}
                    </div>
                    <div className="w-full max-w-[220px] bg-gradient-to-b from-amber-200 to-amber-100 rounded-lg p-3 text-center shadow-md">
                        <h3 className="font-bold text-lg truncate">{third.name}</h3>
                        <p className="text-amber-800 text-sm">{third.department}</p>
                        <div className="mt-2 bg-amber-200 text-amber-800 px-3 py-1 text-sm font-medium rounded-full inline-block">
                            {third.totalEvents || third.count} Events
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

const PaginationButton = ({ page, currentPage, onPageChange, disabled = false, children }) => (
    <button
        onClick={() => !disabled && onPageChange(page)}
        disabled={disabled}
        className={`px-2 py-1.5 md:px-3 md:py-2 mx-0.5 md:mx-1 rounded-lg text-xs md:text-sm font-medium transition-all duration-200 ${page === currentPage
            ? 'bg-primary text-white shadow-md transform scale-105'
            : disabled
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200 hover:shadow-sm'
            }`}
    >
        {children}
    </button>
);

const Pagination = ({
    currentPage,
    totalPages,
    onPageChange,
    hasNextPage,
    hasPrevPage,
    onLoadMore,
    showLoadMore = false
}) => {
    if (totalPages <= 1 && !showLoadMore) return null;

    return (
        <div className="flex flex-wrap justify-center items-center mt-8 gap-2 px-4">
            {!showLoadMore ? (
                <>
                    <PaginationButton
                        page={currentPage - 1}
                        currentPage={currentPage}
                        onPageChange={onPageChange}
                        disabled={!hasPrevPage}
                    >
                        Previous
                    </PaginationButton>

                    {[...Array(Math.min(5, totalPages))].map((_, i) => {
                        const page = i + 1;
                        return (
                            <PaginationButton
                                key={page}
                                page={page}
                                currentPage={currentPage}
                                onPageChange={onPageChange}
                            >
                                {page}
                            </PaginationButton>
                        );
                    })}

                    <PaginationButton
                        page={currentPage + 1}
                        currentPage={currentPage}
                        onPageChange={onPageChange}
                        disabled={!hasNextPage}
                    >
                        Next
                    </PaginationButton>
                </>
            ) : (
                <button
                    onClick={onLoadMore}
                    disabled={!hasNextPage}
                    className={`px-6 py-3 md:px-8 md:py-4 rounded-xl font-medium text-sm md:text-base transition-all duration-300 transform ${hasNextPage
                        ? 'bg-primary text-white hover:bg-primary-dark hover:scale-105 shadow-lg hover:shadow-xl'
                        : 'bg-gray-200 text-gray-500 cursor-not-allowed opacity-60'
                        }`}
                >
                    {hasNextPage ? '📈 Load More Results' : '🏁 No More Results'}
                </button>
            )}
        </div>
    );
};

const Leaderboard = ({
    title = "Leaderboard",
    subtitle = "",
    leaders = [],
    className = "",
    showTop3 = true,
    activeCategory = "",
    categories = [],
    onCategoryChange = () => { },
    unit = "Events",
    // Pagination props
    currentPage = 1,
    totalPages = 1,
    onPageChange = () => { },
    hasNextPage = false,
    hasPrevPage = false,
    onLoadMore = () => { },
    showLoadMore = false,
    loading = false
}) => {
    return (
        <div className={`${className} w-full`}>
            {/* Header */}
            <div className="text-center mb-8 px-4">
                <h2 className="text-2xl md:text-3xl font-bold mb-2 text-gray-800">{title}</h2>
                {subtitle && <p className="text-gray-600 text-sm md:text-base max-w-2xl mx-auto">{subtitle}</p>}

                {/* Category filters */}
                {categories.length > 0 && (
                    <div className="flex flex-wrap justify-center gap-2 mt-6">
                        {categories.map(category => (
                            <button
                                key={category.value}
                                onClick={() => onCategoryChange(category.value)}
                                className={`px-3 py-1.5 md:px-4 md:py-2 rounded-full text-xs md:text-sm font-medium transition-all duration-200 ${activeCategory === category.value
                                    ? 'bg-primary text-white shadow-md transform scale-105'
                                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200 hover:shadow-sm'
                                    }`}
                            >
                                {category.label}
                            </button>
                        ))}
                    </div>
                )}
            </div>

            {/* Top 3 display */}
            {showTop3 && leaders.length > 0 && (
                <TopThreeDisplay leaders={leaders} className="mb-12" />
            )}

            {/* Full leaderboard list */}
            <div className="space-y-3 max-w-3xl mx-auto">
                {loading ? (
                    <div className="text-center py-8">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
                        <p className="mt-2 text-gray-500">Loading leaderboard...</p>
                    </div>
                ) : (
                    <>
                        {leaders.slice(showTop3 ? 3 : 0).map((leader, index) => (
                            <LeaderboardCard
                                key={leader.id || index}
                                rank={showTop3 ? index + 4 : index + 1}
                                name={leader.name}
                                avatarUrl={leader.profileImage || leader.avatarUrl}
                                department={leader.department}
                                count={leader.totalEvents || leader.count}
                                unit={unit}
                            />
                        ))}

                        {leaders.length === 0 && (
                            <div className="text-center py-8 text-gray-500">
                                No data available
                            </div>
                        )}
                    </>
                )}
            </div>

            {/* Pagination */}
            <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={onPageChange}
                hasNextPage={hasNextPage}
                hasPrevPage={hasPrevPage}
                onLoadMore={onLoadMore}
                showLoadMore={showLoadMore}
            />
        </div>
    );
};

export default Leaderboard;