interface FilterProps {
  onFilterChange: (filter: string) => void;
  selectedFilter: string;
  onSortChange: (sortOption: string) => void;
}

const Filter: React.FC<FilterProps> = ({ onFilterChange, selectedFilter, onSortChange }) => {
  const genderOptions = ['Men', 'Women', 'Kids'];
  const handleClearFilter = () => {
    onFilterChange('');
  };

  return (
    <div className="w-full bg-titan-bg-theme shadow-sm mb-6">
      <div className="container mx-auto px-4 py-4">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-4">
            <span className="text-gray-700 font-medium">Filter By Gender</span>
            <div className="flex gap-4">
              {genderOptions.map((gender) => (
                <button
                  key={gender}
                  onClick={() => onFilterChange(gender.toLowerCase())}
                  className={`px-4 py-2 rounded-md transition-colors ${
                    selectedFilter === gender.toLowerCase()
                      ? 'bg-titan-bg-theme text-black border border-titan-theme-dark'
                      : 'text-gray-600 hover:bg-titan-theme-dark'
                  }`}
                >
                  {gender}
                </button>
              ))}
              {selectedFilter && (
                <button
                  onClick={handleClearFilter}
                  className="px-4 py-2 rounded-md bg-titan-bg-theme text-titan-theme-dark border border-titan-theme-dark hover:bg-titan-bg-theme transition-colors "
                >
                  Clear Filter
                </button>
              )}
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <span className="text-gray-700">SORT BY:</span>
              <select
                onChange={(e) => onSortChange(e.target.value)}
                className="px-4 py-2 border rounded-md bg-white"
              >
                <option value="all">All</option>
                <option value="popularity">Popularity</option>
                <option value="highToLow">Price: High To Low</option>
                <option value="lowToHigh">Price: Low To High</option>
                <option value="bestSellers">Best Selling Item</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Filter
