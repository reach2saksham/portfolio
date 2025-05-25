import Link from "next/link"
import { useRouter } from 'next/navigation'

const NavLink = ({href, title}) => {
    const router = useRouter();
    
    const handleClick = (e) => {
        e.preventDefault();
        
        if (href.startsWith('#')) {
            const targetId = href.substring(1);
            const isOnHomePage = window.location.pathname === '/';
            
            // Special handling for Contact - always try to scroll to footer on current page first
            if (title === 'Contact') {
                const targetElement = document.getElementById(targetId);
                
                if (targetElement) {
                    // Footer exists on current page, scroll to it
                    const navbarHeight = 40;
                    const elementPosition = targetElement.getBoundingClientRect().top;
                    const offsetPosition = elementPosition + window.pageYOffset - navbarHeight;

                    window.scrollTo({
                        top: offsetPosition,
                        behavior: 'smooth'
                    });
                    return; // Exit early, don't navigate away
                }
            }
            
            // For other links or if Contact footer doesn't exist on current page
            const targetElement = document.getElementById(targetId);
            
            // If element exists on current page, scroll to it
            if (targetElement && isOnHomePage) {
                const navbarHeight = 40;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - navbarHeight;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            } else {
                // If element doesn't exist on current page or not on home page, navigate to home
                if (!isOnHomePage) {
                    // Add slide transition - slide to right when leaving other pages
                    document.body.classList.add('transitioning');
                    document.body.style.transform = 'translateX(100%)';
                    
                    setTimeout(() => {
                        router.push(`/${href}`);
                    }, 300);
                } else {
                    // Just navigate with hash if already on home
                    router.push(`/${href}`);
                }
            }
        }
    };

    return (
        <Link 
            href={href} 
            onClick={handleClick}
            className='block sm:text-base rounded md:p-0 hover:text-purple-300'>
            {title}
        </Link>
    )
}

export default NavLink;