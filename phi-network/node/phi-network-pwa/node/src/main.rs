use sc_service::{Configuration, TaskManager, ServiceError};
use solochain_template_runtime::{Block, RuntimeApi};
use sp_runtime::generic::Block as GenericBlock;
use sc_executor::NativeElseWasmExecutor;

pub struct Executor;

impl sc_executor::NativeExecutionDispatch for Executor {
    type ExtendHostFunctions = ();

    fn dispatch(method: &str, data: &[u8]) -> Option<Vec<u8>> {
        solochain_template_runtime::api::dispatch(method, data)
    }

    fn native_version() -> sc_executor::NativeVersion {
        solochain_template_runtime::native_version()
    }
}

// Full node function
pub fn new_full(
    config: Configuration,
) -> Result<TaskManager, ServiceError> {
    let builder = sc_service::new_full::<Block, RuntimeApi, Executor>(&config)?;
    let full_node = builder.build_full()?;
    Ok(full_node.task_manager)
}

fn main() -> Result<(), Box<dyn std::error::Error>> {
    let config = Configuration::default();
    let _task_manager = new_full(config)?;
    Ok(())
}
