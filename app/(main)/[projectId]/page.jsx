"use client";
import { useParams } from 'next/navigation';
import React from 'react'

const Editor = async() => {
    const { projectid } = await useParams();

  return <div>Editor: {projectid}</div>
};

export default Editor;