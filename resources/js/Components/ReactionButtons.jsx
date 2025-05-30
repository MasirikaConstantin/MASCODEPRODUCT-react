import React from 'react';
import { Link, usePage } from '@inertiajs/react';

export default function ReactionButtons({ post }) {
    const { auth } = usePage().props;

    return (
        <div className="flex items-center space-x-6 bg-neutral/20 bg-base-100 rounded-box p-4">
            {auth.user ? (
                <>
                    <div className="flex items-center space-x-2">
                        <Link 
                            href={route('user.reaction', {post: post.id, reaction: 1})}
                            className="tooltip tooltip-bottom"
                            data-tip="J'aime"
                        >
                            {auth.user.reactions?.some(r => r.post_id === post.id && r.reaction === 1) ? (
                                <svg className="w-6 h-6 text-primary" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M2 10.5a1.5 1.5 0 113 0v6a1.5 1.5 0 01-3 0v-6zM6 10.333v5.43a2 2 0 001.106 1.79l.05.025A4 4 0 008.943 18h5.416a2 2 0 001.962-1.608l1.2-6A2 2 0 0015.56 8H12V4a2 2 0 00-2-2 1 1 0 00-1 1v.667a4 4 0 01-.8 2.4L6.8 7.933a4 4 0 00-.8 2.4z" />
                                </svg>
                            ) : (
                                <svg className="w-6 h-6  hover:text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
                                </svg>
                            )}
                        </Link>
                        <span className=" font-medium">
                            {post.reactions_count?.positive || 0}
                        </span>
                    </div>

                    <div className="flex items-center space-x-2">
                        <Link 
                            href={route('user.reaction', {post: post.id, reaction: 0})}
                            className="tooltip tooltip-bottom"
                            data-tip="Je n'aime pas"
                        >
                            {auth.user.reactions?.some(r => r.post_id === post.id && r.reaction === 0) ? (
                                <svg className="w-6 h-6 text-error" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M18 9.5a1.5 1.5 0 11-3 0v-6a1.5 1.5 0 013 0v6zM14 9.667v-5.43a2 2 0 00-1.105-1.79l-.05-.025A4 4 0 0011.055 2H5.64a2 2 0 00-1.962 1.608l-1.2 6A2 2 0 004.44 12H8v4a2 2 0 002 2 1 1 0 001-1v-.667a4 4 0 01.8-2.4l1.4-1.866a4 4 0 00.8-2.4z" />
                                </svg>
                            ) : (
                                <svg className="w-6 h-6  hover:text-error" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14H5.236a2 2 0 01-1.789-2.894l3.5-7A2 2 0 018.736 3h4.018a2 2 0 01.485.06l3.76.94m-7 10v5a2 2 0 002 2h.096c.5 0 .905-.405.905-.904 0-.715.211-1.413.608-2.008L17 13V4m-7 10h2m5-10h2a2 2 0 012 2v6a2 2 0 01-2 2h-2.5" />
                                </svg>
                            )}
                        </Link>
                        <span className=" font-medium">
                            {post.reactions_count?.negative || 0}
                        </span>
                    </div>
                </>
            ) : (
                <>
                    <div className="flex items-center space-x-2">
                        <svg className="w-6 h-6 " fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
                        </svg>
                        <span className=" font-medium">
                            {post.reactions_count?.positive || 0}
                        </span>
                        <span className=" text-sm">Positive</span>
                    </div>

                    <div className="flex items-center space-x-2">
                        <svg className="w-6 h-6 " fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14H5.236a2 2 0 01-1.789-2.894l3.5-7A2 2 0 018.736 3h4.018a2 2 0 01.485.06l3.76.94m-7 10v5a2 2 0 002 2h.096c.5 0 .905-.405.905-.904 0-.715.211-1.413.608-2.008L17 13V4m-7 10h2m5-10h2a2 2 0 012 2v6a2 2 0 01-2 2h-2.5" />
                        </svg>
                        <span className=" font-medium">
                            {post.reactions_count?.negative || 0}
                        </span>
                        <span className=" text-sm">Négative</span>
                    </div>
                </>
            )}
        </div>
    );
}