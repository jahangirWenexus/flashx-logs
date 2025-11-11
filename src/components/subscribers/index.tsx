import SubscribersCart from "./subscripber-card";
import SubscriberList from "./subscriber-list";
import useDebounce from "../../hooks/debounce";
import {useCallback, useEffect, useState} from "react";
import {BASE_URL} from "../../config";
// import * as XLSX from "xlsx";
import type {IStats, StoreRecordList} from "./type";

const Subscribers = () => {
    const [data, setSubscribers] = useState<StoreRecordList>([]);
    const [pagination, setPagination] = useState<any>({});
    const [loading, setLoading] = useState<boolean>(true);
    const [page, setPage] = useState<number>(1);
    const [stats, setStats] = useState<IStats>({
        currentInstalled: 0,
        totalInstalled: 0,
        totalUninstalled: 0,
        totalCampaigns: 0,
        totalScheduleCampaigns: 0,
        totalActiveCampaigns: 0,

    });
    const [filters, setFilters] = useState<string>("all");
    const [queryValue, setQueryValue] = useState("");
    const searchTerm = useDebounce(queryValue, 700);
    const [reFetch, setReFetch] = useState<boolean>(false);

    console.log(data)

    useEffect(() => {
        setLoading(true);
        fetch(
            `${BASE_URL}/admin/dashboard?page=${page}&limit=50&filter=${filters}&searchTerm=${searchTerm}`
        )
            .then((res) => res.json())
            .then((res) => {
                setSubscribers(res.data);
                setPagination(res.pagination);
                // setStats(res.stats);
                setLoading(false);
            })
            .catch((err) => {
                console.log(err);
                setSubscribers([]);
                setPagination({});
                // setStats({
                //     totalActive: 0,
                //     totalCampaigns: 0,
                //     totalScheduleCampaigns: 0,
                //     totalStore: 0,
                //     totalActiveCampaigns: 0,
                //
                // });
                setLoading(false);
            });
    }, [page, filters, searchTerm, reFetch]);

    const fetchMetrics = useCallback(async () => {
        // setLoading(true);
        fetch(
            `${BASE_URL}/api/app-summary`
        )
            .then((res) => res.json())
            .then((res) => {
                setStats(res);
                // setLoading(false);
            })
            .catch((err) => {
                console.log(err);
                setStats({
                    totalInstalled: 0,
                    totalUninstalled: 0,
                    totalCampaigns: 0,
                    currentInstalled: 0,
                    totalScheduleCampaigns: 0,
                    totalActiveCampaigns: 0,

                });
                // setLoading(false);
            });

    }, [stats, setStats])

    useEffect(() => {
        fetchMetrics();
    }, []);

    useEffect(() => {
        setPage(1);
    }, [filters, searchTerm]);


    return (
        <div className="p-6">
            <SubscribersCart stats={stats}/>
            <br/>
            {/*<Box paddingBlockEnd={"400"}>*/}
            {/*  <div className="flex justify-end">*/}
            {/*    <Button*/}
            {/*      variant="primary"*/}
            {/*      tone="success"*/}
            {/*      onClick={handleExport}*/}
            {/*      icon={<Icon source={ExportIcon} />}*/}
            {/*    >*/}
            {/*      Export*/}
            {/*    </Button>*/}
            {/*  </div>*/}
            {/*</Box>*/}
            <SubscriberList
                stores={data ?? []}
                pagination={pagination}
                loading={loading}
                setPage={setPage}
                page={page}
                setFilters={setFilters}
                setQueryValue={setQueryValue}
                queryValue={queryValue}
                setReFetch={setReFetch}
            />
        </div>
    );
};

export default Subscribers;
