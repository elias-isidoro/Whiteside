import { toastError } from "@/lib/utils";
import { useState } from "react";


const useTagManager = () => {
  
  const [newTag, setNewTag] = useState('');
  const [tags, setTags] = useState<string[]>([]);

  const addTag = () => {
    const lowerCaseTags = tags.map(tag => tag.toLowerCase());
    const lowerCaseTagHolder = newTag.toLowerCase();

    if (lowerCaseTags.includes(lowerCaseTagHolder)) {
      return toastError('Error', 'Tag already exists')
    }

    setTags((current) => [...current, newTag ])
    setNewTag(()=>'')
  }

  const removeTag = (tag: string) => {
    setTags((current) => current.filter((t) => t !== tag))
  }

  const clearTags = () => {
    setTags(() => [])
  }

  return { tags, addTag, removeTag, clearTags, setNewTag, newTag }

}

export default useTagManager