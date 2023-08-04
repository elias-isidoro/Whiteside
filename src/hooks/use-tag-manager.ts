import { toastError } from "@/lib/utils";
import { useState } from "react";

interface Props {
  value?: string[]
}

const useTagManager = ({value=[]}:Props = {}) => {
  
  const [newTag, setNewTag] = useState('');
  const [tags, setTags] = useState<string[]>(value);

  const addTag = () => {
    const lowerCaseTags = tags.map(tag => tag.toLowerCase());
    const newTagsArray = newTag.split(',').map(tag => tag.trim().toLowerCase());
  
    const filteredTags = newTagsArray.filter(tag => !lowerCaseTags.includes(tag));
  
    setTags(current => [...current, ...filteredTags]);
    setNewTag('');
  }

  const removeTag = (tag: string) => {
    setTags((current) => current.filter((t) => t !== tag))
  }

  const clearTags = () => {
    setTags(() => [])
  }

  return { tags, addTag, removeTag, clearTags, setNewTag, newTag, setTags }

}

export default useTagManager