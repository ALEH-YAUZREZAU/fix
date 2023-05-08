import React, { useState, useEffect, useRef } from "react";
import { useQuery, gql } from "@apollo/client";
import { ITag } from "@components/Workout/types";
import Tag from "@components/Workout/Tag";

const SEARCH_TAGS = gql`
  query SearchTags($query: String!) {
    searchTags(query: $query) {
      id
      name
    }
  }
`;

interface TagSelectProps {
  onChange: (tags: ITag[]) => void;
}

export const TagSelect: React.FC<TagSelectProps> = ({ onChange }) => {
  const [search, setSearch] = useState("");
  const [selectedTags, setSelectedTags] = useState<ITag[]>([]);
  const { loading, error, data } = useQuery(SEARCH_TAGS, {
    variables: { query: search },
    skip: search.length < 2,
  });
  const wrapperRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    onChange(selectedTags);
  }, [selectedTags, onChange]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setSearch("");
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [wrapperRef]);

  const addTag = (tag: ITag) => {
    if (!selectedTags.some((t) => t.id === tag.id)) {
      setSelectedTags([...selectedTags, tag]);
    }
  };

  const removeTag = (tag: ITag) => {
    setSelectedTags(selectedTags.filter((t) => t.id !== tag.id));
  };

  const handleTagSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  };

  const availableTags = data?.searchTags.filter((tag: ITag) => !selectedTags.some((selectedTag) => selectedTag.id === tag.id));

  return (
    <div className="relative" ref={wrapperRef}>
      <div className="flex flex-wrap mt-2">
        {selectedTags.map((tag: ITag) => (
          <Tag tag={tag} onRemove={removeTag} />
        ))}
      </div>
      <input
        type="text"
        value={search}
        onChange={handleTagSearch}
        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
      />
      {loading && <div>Loading...</div>}
      {error && <div>Error: {error.message}</div>}
      {availableTags && availableTags.length > 0 && (
        <div className="absolute z-10 bg-white border border-gray-300 rounded-md shadow mt-1 w-full">
          <ul>
            {availableTags.map((tag: Tag) => (
              <li key={tag.id} onClick={() => addTag(tag)} className="cursor-pointer hover:bg-gray-200 p-2">
                {tag.name}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default TagSelect;
