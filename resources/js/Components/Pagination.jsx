import { Link } from '@inertiajs/react';

export default function Pagination({ links }) {
    return (
        <div className="flex justify-center mt-4">
            <nav className="flex space-x-2">
                {links.map((link, index) => (
                    <Link
                        key={index}
                        href={link.url || '#'}
                        className={`px-3 py-1 rounded-md ${
                            link.active
                                ? 'bg-blue-500 text-white'
                                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                        }`}
                        dangerouslySetInnerHTML={{ __html: link.label }}
                        preserveScroll
                    />
                ))}
            </nav>
        </div>
    );
}