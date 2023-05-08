import { ITag } from "@components/Workout/types";

type TTag = {
  tag: ITag;
  onRemove?: (tag: ITag) => void;
};

const Tag: React.FC<TTag> = (props) => {
  const { tag, onRemove } = props;
  const { name } = tag;

  return (
    <div className="bg-indigo-600 text-white px-2 py-1 m-1 rounded items-center inline-flex">
      <span>{tag.name}</span>
      {onRemove && (
        <button
          onClick={() => onRemove(tag)}
          className="ml-2
      2 text-xs font-bold"
        >
          ×
        </button>
      )}
    </div>
  );
};

export default Tag;
