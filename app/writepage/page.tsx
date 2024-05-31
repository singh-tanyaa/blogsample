import React, { useState, ChangeEvent } from 'react';
import Image from 'next/image';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.bubble.css';
import axios from 'axios';
import styles from './write.module.css'; // Assuming you have some CSS module

const writePage: React.FC = () => {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [value, setValue] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [open, setOpen] = useState(false);

  const handleSubmit = async () => {
    const formData = new FormData();
    formData.append('title', title);
    formData.append('category', category);
    formData.append('content', value);
    if (file) formData.append('image', file);

    try {
      const response = await axios.post('https://apiblog.peymagen.com/api/blog/', formData);
      console.log('Blog created successfully:', response.data);
    } catch (error) {
      console.error('Error creating blog:', error);
    }
  };

  const handleUpdate = async (blogId: string) => {
    const formData = new FormData();
    formData.append('title', title);
    formData.append('catgory', category);
    formData.append('content', value);
    if (file) formData.append('image', file);

    try {
      const response = await axios.put(`https://apiblog.peymagen.com/api/blog/${blogId}/`, formData);
      console.log('Blog updated successfully:', response.data);
    } catch (error) {
      console.error('Error updating blog:', error);
    }
  };

  return (
    <div className={styles.container}>
      <input
        type="text"
        placeholder="Title"
        className={styles.input}
        onChange={(e) => setTitle(e.target.value)}
      />
      <select
        className={styles.select}
        onChange={(e) => setCategory(e.target.value)}
      >
        <option value="style">style</option>
        <option value="fashion">fashion</option>
        <option value="food">food</option>
        <option value="culture">culture</option>
        <option value="travel">travel</option>
        <option value="coding">coding</option>
      </select>
      <div className={styles.editor}>
        <button className={styles.button} onClick={() => setOpen(!open)}>
          <Image src="/plus.png" alt="" width={16} height={16} />
        </button>
        {open && (
          <div className={styles.add}>
            <input
              type="file"
              id="image"
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setFile(e.target.files ? e.target.files[0] : null)
              }
              style={{ display: "none" }}
            />
            <button className={styles.addButton}>
              <label htmlFor="image">
                <Image src="/image.png" alt="" width={16} height={16} />
              </label>
            </button>
            <button className={styles.addButton}>
              <Image src="/external.png" alt="" width={16} height={16} />
            </button>
            <button className={styles.addButton}>
              <Image src="/video.png" alt="" width={16} height={16} />
            </button>
          </div>
        )}
        <ReactQuill
          className={styles.textArea}
          theme="bubble"
          value={value}
          onChange={setValue}
          placeholder="Tell your story..."
        />
      </div>
      <button className={styles.publish} onClick={handleSubmit}>
        Publish
      </button>
      <button
        className={styles.publish}
        onClick={() => handleUpdate('your-blog-id')}
      >
        Update
      </button>
    </div>
  );
};

export default writePage;

