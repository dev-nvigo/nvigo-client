import Pagination from "@/components/ui/pagination";
import Cards from "@/components/ui/cards";
import CategorySwitcher from "@/components/CategorySwitcher";
import { getServiceCategories, fetchVendors } from '@/lib/api/vendor';
import { notFound } from 'next/navigation';


export default async function Services({ searchParams }: { searchParams: Promise<{ service?: string; page?: string }> }) {
    const { service, page } = await searchParams;
    const { services, error } = await getServiceCategories();

    if (!services || error) return notFound();

    const selectedService = service || "all";
    const currentPage = parseInt(page || "1", 10);

    const { data: all_vendors, totalPages } = await fetchVendors(
        selectedService !== "all" ? selectedService : null,
        currentPage
    );

    return (
        <div className="flex flex-col md:flex-row h-full px-10 py-5">
            <div className="sticky top-14 max-h-[calc(100vh-5rem)] overflow-auto">
                <CategorySwitcher
                    title="Categories"
                    items={services}
                    queryParam="service"
                    basePath="/services"
                />
            </div>

            <div className="flex-1 p-6">
                <Cards basePath="" category="Vendors" cards={all_vendors} className="md:grid md:!grid-cols-3 gap-6" />
                <Pagination totalPages={totalPages} basePath="/services" scrollBehavior={false} />
            </div>
        </div>
    );
};
