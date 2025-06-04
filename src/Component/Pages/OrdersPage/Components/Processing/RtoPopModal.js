import RtoPredictionModal from './RtoPredictionModal'

const RtoPopModal = ({ rtoPop, setrtoPop, orderId, token, setLoader }) => {

    return (
        <>
            <div className={`rto-pop-modal ${rtoPop && "open"}`}>
                {
                    rtoPop &&
                    <RtoPredictionModal
                        token={token}
                        orderId={orderId}
                        rtoPop={rtoPop}
                        setLoader={setLoader}
                    />
                }
            </div>
            <div onClick={() => setrtoPop(false)} className={`backdrop ${!rtoPop && "d-none"}`}></div>
        </>
    )
}

export default RtoPopModal